import { readFileSync } from 'node:fs'
import { fileURLToPath } from 'node:url'
import { join, dirname } from 'node:path'
import { logLevel } from '@iot/libs'
import type { ConfigMap } from './config.schema.js'

const pkgPath = join(dirname(fileURLToPath(import.meta.url)), '../../package.json')
const pkg = JSON.parse(readFileSync(pkgPath, { encoding: 'utf-8' }))

export default (env: NodeJS.ProcessEnv): Record<keyof ConfigMap, unknown> => ({
  // same on all env
  APP_NAME: pkg.name,
  APP_ENV: env.APP_ENV,
  PORT: 4010,
  LOG_LEVEL: env.LOG_LEVEL || logLevel.info,
  POSTGRES_HOST: env.POSTGRES_HOST,
  POSTGRES_PORT: env.POSTGRES_PORT,
  POSTGRES_USER: env.POSTGRES_USER,
  POSTGRES_PASSWORD: env.POSTGRES_PASSWORD,
  POSTGRES_DB: env.POSTGRES_DB,
  // overridden
  METRICS_ENABLED: false
})
