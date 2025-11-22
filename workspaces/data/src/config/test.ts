import type { ConfigMap } from './config.schema.js'
import * as constants from './constants.js'

export default () => ({
  APP_ENV: 'test',
  LOG_LEVEL: constants.logLevel.info,
  POSTGRES_HOST: 'localhost',
  POSTGRES_PORT: 5432,
  POSTGRES_USER: 'postgres',
  POSTGRES_PASSWORD: 'postgres',
  POSTGRES_DB: 'iot',
  METRICS_ENABLED: false,
} satisfies ConfigMap)
