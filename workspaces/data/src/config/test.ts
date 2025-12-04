import { readFileSync } from 'node:fs'
import { fileURLToPath } from 'node:url'
import { join, dirname } from 'node:path'
import type { ConfigMap } from './config.schema.js'
import * as constants from './constants.js'

const pkgPath = join(dirname(fileURLToPath(import.meta.url)), '../../package.json')
const pkg = JSON.parse(readFileSync(pkgPath, { encoding: 'utf-8' }))

export default () => ({
  APP_NAME: pkg.name,
  APP_ENV: 'test',
  LOG_LEVEL: constants.logLevel.info,
  POSTGRES_HOST: 'localhost',
  POSTGRES_PORT: 5432,
  POSTGRES_USER: 'postgres',
  POSTGRES_PASSWORD: 'postgres',
  POSTGRES_DB: 'iot',
  METRICS_ENABLED: false,
  SEEDS: ['device', 'weather']
} satisfies ConfigMap)
