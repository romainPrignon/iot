import { Client, Pool } from 'pg'
import config from '../config/config.js'

export const makePgClient = (): Client & AsyncDisposable => {
  const client = new Client({
    host: config.get('POSTGRES_HOST'),
    port: config.get('POSTGRES_PORT'),
    user: config.get('POSTGRES_USER'),
    password: config.get('POSTGRES_PASSWORD'),
    database: config.get('POSTGRES_DB'),
    application_name: config.get('APP_NAME')
  })

  Object.assign(client, {
    [Symbol.asyncDispose]: async () => {
      await client.end()
    }
  })

  return client as Client & AsyncDisposable
}

export const makePgPool = (): Pool & AsyncDisposable => {
  const pool = new Pool({
    host: config.get('POSTGRES_HOST'),
    port: config.get('POSTGRES_PORT'),
    user: config.get('POSTGRES_USER'),
    password: config.get('POSTGRES_PASSWORD'),
    database: config.get('POSTGRES_DB'),
    application_name: config.get('APP_NAME')
  })

  Object.assign(pool, {
    [Symbol.asyncDispose]: async () => {
      await pool.end()
    }
  })

  return pool as Pool & AsyncDisposable
}
