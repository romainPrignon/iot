import { Kubernetes } from "../ressources/kubernetes.ressource.js"
import { Vpc } from "../ressources/vpc.ressource.js"

const { iot_region, iot_cluster_name, iot_cluster_node_count, iot_cluster_version } = process.env

export default async () => {
  const vpc = await Vpc({
    'default-fra1': {
      name: 'default-fra1',
    },
    'iot-public': {
      name: 'iot-public',
      description: 'iot public vpc',
      region: iot_region,
      ip_range: '10.0.0.0/16',
    }
  })

  // const kubernetes = await Kubernetes({
  //   iot: {
  //     name: iot_cluster_name,
  //     region: iot_region,
  //     version: '1.34.1-do.3',
  //     vpc_uuid: vpc['iot-public']!.id,
  //     node_pools: [
  //       {
  //         name: 'iot',
  //         size: 's-1vcpu-2gb',
  //         count: iot_cluster_node_count
  //       }
  //     ]
  //   }
  // })
}
