/**
 * pnpm run push --kind=image|secret --env=dev|prod
 */
import { argv, parseArgv } from "zx"
import { importImage, importSecret } from '../../kube/tasks/import.task.js'

type Argv = typeof argv

const ns = 'iot'
const app = 'worker'
const envFile = '.env.dev'

const main = async (argv: Argv): Promise<void> => {
  const { kind, env } = argv

  if (kind === 'image') {
    await importImage(`docker.io/${ns}/${app}`, 'latest')
  }

  if (kind === 'secret') {
    await importSecret(app, envFile)
  }
}

if (import.meta.url.includes('push.task.ts')) {
  main(parseArgv())
}
