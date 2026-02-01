/**
 * pnpm run dev [--start|stop]
 */
import { $, argv, parseArgv } from "zx"
import { cluster_name, count, version } from '../src/stacks/dev.stack.js'

type Argv = typeof argv

$.quote = (a) => a

const _start = async () => $`k3d --verbose cluster create ${cluster_name} --servers ${count} --image rancher/k3s:${version}-k3s1`

const _stop = async () => $`k3d --verbose cluster delete ${cluster_name}`

const main = async (argv: Argv) => {
  const { stop } = argv

  if (stop) { await _stop(); return }

  await _start()
}

main(parseArgv())
