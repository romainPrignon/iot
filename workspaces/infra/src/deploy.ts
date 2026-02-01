import type { IKubernetesCluster } from 'dots-wrapper/dist/kubernetes/index.js'
import type { IVpc } from 'dots-wrapper/dist/vpc/index.js'
import { kubernetes as kubernetesConfig, vpc as vpcConfig } from './stacks/prod.stack.js'
import { Vpc } from './ressources/vpc.ressource.js'
import { Kubernetes } from './ressources/kubernetes.ressource.js'


export type VpcConfig = Record<string, Partial<IVpc>>
export type KubernetesConfig = Record<string, Partial<IKubernetesCluster>>

export const deploy = async () => {
  const vpc = await Vpc(vpcConfig)
  console.log({ vpc })

  const kube = await Kubernetes(kubernetesConfig)
  console.log({ kube })
}



