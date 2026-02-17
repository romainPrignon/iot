import type { KubernetesConfig, VpcConfig } from '../deploy.js'

export const vpc: VpcConfig = {
  'default-fra1': {
    name: 'default-fra1',
  },
  'iot-public': {
    name: 'iot-public',
    description: 'iot public vpc',
    region: 'fra1',
    ip_range: '10.0.0.0/16',
  }
}

export const kubernetes: KubernetesConfig = {
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
}
