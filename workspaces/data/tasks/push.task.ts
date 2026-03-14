/**
 * just secret-import --env=dev|prod
 */
import { argv, parseArgv } from "zx"
import { importSecret } from '../../kube/tasks/import.task.js'

type Argv = typeof argv

const app = 'data'
const envFile = '.env'

const main = async (argv: Argv): Promise<void> => {
  const { env } = argv

  await importSecret(app, `${envFile}.${env}`)
}

// eslint-disable-next-line n/no-unsupported-features/node-builtins
if (import.meta.main) {
  main(parseArgv())
}
