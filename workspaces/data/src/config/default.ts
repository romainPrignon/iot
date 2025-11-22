import * as constants from './constants.js'

export default (env: NodeJS.ProcessEnv) => ({
  APP_ENV: env.APP_ENV,
  LOG_LEVEL: env.LOG_LEVEL || constants.logLevel.info,
  POSTGRES_HOST: env.POSTGRES_HOST,
  POSTGRES_PORT: env.POSTGRES_PORT,
  POSTGRES_USER: env.POSTGRES_USER,
  POSTGRES_PASSWORD: env.POSTGRES_PASSWORD,
  POSTGRES_DB: env.POSTGRES_DB,
})
