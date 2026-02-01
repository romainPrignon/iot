import 'dotenv/config'

import { createApiClient } from 'dots-wrapper'
import type { IKubernetesCluster } from 'dots-wrapper/dist/kubernetes/index.js'
import type { IVpc } from 'dots-wrapper/dist/vpc/index.js'

const dots = createApiClient({ token: process.env.DO_TOKEN! })


type VpcConfig = Record<string, Partial<IVpc>>
type KubernetesConfig = Record<string, Partial<IKubernetesCluster>>

const Vpc = async (config: VpcConfig) => {
  const state = []

  const { data: { vpcs } } = await dots.vpc.listVpcs({})
  const remoteVpcs = new Set(vpcs.map(vpc => vpc.name))
  const localVpcs = new Set(Object.values(config).map((vpc) => vpc.name))

  const toDelete = remoteVpcs.difference(localVpcs)
  console.log("[infra][vpc][delete]", toDelete)
  const toCreate = localVpcs.difference(remoteVpcs)
  console.log("[infra][vpc][create]", toCreate)
  const toUpdate = remoteVpcs.intersection(localVpcs)
  console.log("[infra][vpc][update]", toUpdate)

  const vpcsToDelete = vpcs.filter(vpc => toDelete.has(vpc.name))
  const vpcsToUpdate = vpcs.filter(vpc => toUpdate.has(vpc.name))
  const vpcsToCreate = Object.values(config).filter((vpc) => toCreate.has(vpc.name))

  await Promise.all(vpcsToDelete.map(async (vpc) => {
    await dots.vpc.deleteVpc({
      vpc_id: vpc.id,
    })
  }))

  state.push(...await Promise.all(vpcsToCreate.map(async (vpc) => {
    const { data } = await dots.vpc.createVpc({
      name: vpc.name!,
      description: vpc.description,
      region: vpc.region!,
      ip_range: vpc.ip_range,
    })

    return data.vpc
  })))

  state.push(...await Promise.all(vpcsToUpdate.map(async (vpc) => {
    const { data } = await dots.vpc.updateVpc({
      vpc_id: vpc.id,
      name: vpc.name,
      description: vpc.description,
    })
    return data.vpc
  })))

  return state.reduce((acc, vpc) => {
    acc[vpc.name] = vpc
    return acc
  }, {} as VpcConfig)
}

const Kubernetes = async (config: KubernetesConfig) => {
  const state = []

  const { data: { kubernetes_clusters } } = await dots.kubernetes.listKubernetesClusters({})
  const remotekubes = new Set(kubernetes_clusters.map(kube => kube.name))
  const localkubes = new Set(Object.values(config).map((kube) => kube.name))

  const toDelete = remotekubes.difference(localkubes)
  console.log("[infra][kube][delete]", toDelete)
  const toCreate = localkubes.difference(remotekubes)
  console.log("[infra][kube][create]", toCreate)
  const toUpdate = remotekubes.intersection(localkubes)
  console.log("[infra][kube][update]", toUpdate)

  const kubesToDelete = kubernetes_clusters.filter(kube => toDelete.has(kube.name))
  const kubesToUpdate = kubernetes_clusters.filter(kube => toUpdate.has(kube.name))
  const kubesToCreate = Object.values(config).filter((kube) => toCreate.has(kube.name))

  await Promise.all(kubesToDelete.map(async (kube) => {
    await dots.kubernetes.deleteKubernetesCluster({
      kubernetes_cluster_id: kube.id,
    })
    // TODO: zx remove kube config
  }))

  state.push(...await Promise.all(kubesToCreate.map(async (kube) => {
    const { data } = await dots.kubernetes.createKubernetesCluster({
      name: kube.name!,
      region: kube.region!,
      node_pools: kube.node_pools!,
      version: kube.version!,
      vpc_uuid: kube.vpc_uuid!,
    })

    // TODO: zx add kube config

    return data.kubernetes_cluster
  })))

  state.push(...await Promise.all(kubesToUpdate.map(async (kube) => {
    const { data } = await dots.kubernetes.updateKubernetesCluster({
      kubernetes_cluster_id: kube.id,
      name: kube.name
    })
    return data.kubernetes_cluster
  })))

  return state.reduce((acc, kube) => {
    acc[kube.name] = kube
    return acc
  }, {} as Record<string, any>)
}

const main = async () => {
  const vpc = await Vpc({
    'default-fra1': {
      name: 'default-fra1',
    },
    'iot-public': {
      name: 'iot-public',
      description: 'iot public vpc',
      region: 'fra1',
      ip_range: '10.0.0.0/16',
    }
  })
  console.log({ vpc })

  const kube = await Kubernetes({
    // iot: {
    //   name: 'iot',
    //   region: 'fra1',
    //   version: '1.34.1-do.3',
    //   vpc_uuid: vpc['iot-public']!.id,
    //   node_pools: [
    //     {
    //       name: 'iot',
    //       size: 's-1vcpu-2gb',
    //       count: 1
    //     }
    //   ]
    // }
  })
  console.log({ kube })
}

main()

