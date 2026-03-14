import { createApiClient } from 'dots-wrapper'
import type { IVpc } from 'dots-wrapper/dist/vpc/index.js'

export type VpcConfig = Record<string, Partial<IVpc>>

const dots = createApiClient({ token: process.env.DO_TOKEN! })

export const Vpc = async (config: VpcConfig) => {
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
      region: vpc.region!, // TODO type VpcConfigEntry = Pick<IVpc, 'name' | 'region'> & Partial<IVpc>
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
