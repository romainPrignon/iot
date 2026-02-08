import { readFileSync } from 'node:fs'
import { logLevel } from '@iot/libs'
import type { ConfigMap } from './config.schema.js'

const pkg = JSON.parse(readFileSync('../../package.json', { encoding: 'utf-8' }))

export default (env: NodeJS.ProcessEnv): Record<keyof ConfigMap, unknown> => ({
  // same on all env
  APP_NAME: pkg.name,
  APP_ENV: env.APP_ENV,
  LOG_LEVEL: env.LOG_LEVEL || logLevel.info,
  POSTGRES_VERSION: env.POSTGRES_VERSION,
  POSTGRES_HOST: env.POSTGRES_HOST,
  POSTGRES_PORT: env.POSTGRES_PORT,
  POSTGRES_USER: env.POSTGRES_USER,
  POSTGRES_PASSWORD: env.POSTGRES_PASSWORD,
  POSTGRES_DB: env.POSTGRES_DB,
  MIGRATION_FOLDER: 'drizzle/',
  SEEDS: [
    'device',
    'weather'
  ],
  // overridden
  METRICS_ENABLED: false
})
