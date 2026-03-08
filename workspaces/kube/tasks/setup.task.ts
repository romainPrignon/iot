/**
 * pnpm run setup --env=dev|prod
 */
import { $, argv, parseArgv } from "zx"

type Argv = typeof argv

export const getCurrentNamespace = async () => $`kubectl ns -c`
export const setCurrentNamespace = async (ns: string) => $`kubectl ns ${ns}`
export const createNamespace = async (ns: string) => $`kubectl create namespace ${ns}`
export const setContext = async (ctx: string) => $`kubectl config use-context ${ctx}`

const ns = 'iot'

const main = async (argv: Argv) => {
  const { env } = argv

  if (env === 'dev') {
    await setContext(`k3d-iot`)
    await createNamespace(ns)
    await setCurrentNamespace(ns)
  }

  if (env === 'prod') {
    await setContext(`do-fra1-iot`)
    await createNamespace(ns)
    await setCurrentNamespace(ns)
  }

}

// eslint-disable-next-line n/no-unsupported-features/node-builtins
if (import.meta.main) {
  $.verbose = true
  main(parseArgv())
}
