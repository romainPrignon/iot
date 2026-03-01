import type { IKubernetesCluster } from 'dots-wrapper/dist/kubernetes/index.js'
import { createApiClient } from 'dots-wrapper'

export type KubernetesConfig = Record<string, Partial<IKubernetesCluster>>

const dots = createApiClient({ token: process.env.DO_TOKEN! })

export const Kubernetes = async (config: KubernetesConfig) => {
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
