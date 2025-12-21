import { Client, Pool, type ClientConfig, type PoolConfig } from 'pg'
import { Config } from '@iot/libs'

type PgConfig = Config<{
  POSTGRES_HOST: string
  POSTGRES_PORT: number
  POSTGRES_USER: string
  POSTGRES_PASSWORD: string
  POSTGRES_DB: string
  APP_NAME: string
}>

export const makePgConfig = (config: PgConfig): ClientConfig & PoolConfig => {
  return {
    host: config.get('POSTGRES_HOST'),
    port: config.get('POSTGRES_PORT'),
    user: config.get('POSTGRES_USER'),
    password: config.get('POSTGRES_PASSWORD'),
    database: config.get('POSTGRES_DB'),
    application_name: config.get('APP_NAME')
  }
}

export const makePgClient = (config: ClientConfig): Client & AsyncDisposable => {
  const client = new Client({
    host: config.host,
    port: config.port,
    user: config.user,
    password: config.password,
    database: config.database,
    application_name: config.application_name
    // TODO: better config for cloud
  })

  Object.assign(client, {
    [Symbol.asyncDispose]: async () => {
      await client.end()
    }
  })

  return client as Client & AsyncDisposable
}

export const makePgPool = (config: PoolConfig): Pool & AsyncDisposable => {
  const pool = new Pool({
    host: config.host,
    port: config.port,
    user: config.user,
    password: config.password,
    database: config.database,
    application_name: config.application_name,
    // TODO: better config for cloud
    min: 1,
    max: 10
  })

  Object.assign(pool, {
    [Symbol.asyncDispose]: async () => {
      await pool.end()
    }
  })

  return pool as Pool & AsyncDisposable
}
