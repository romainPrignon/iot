/**
 * pnpm run push --env=dev|prod
 */
import { argv, parseArgv } from "zx"
import { importSecret } from '../../kube/tasks/import.task.js'

type Argv = typeof argv

const app = 'data'
const envFile = '.env'

const main = async (argv: Argv): Promise<void> => {
  const { env } = argv

  await importSecret(app, envFile)
}

if (import.meta.url.includes('push.task.ts')) {
  main(parseArgv())
}
