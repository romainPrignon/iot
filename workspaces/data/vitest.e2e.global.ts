import 'dotenv/config'
import pgContainer from "./e2e/pg.container.js"
import config from './src/app/config.js'
import { migrate } from 'drizzle-orm/postgres-js/migrator'
import { pgTestContext } from './e2e/pg.context.js'

export async function setup(): Promise<void> {
  await config.load('test')
  const containerConfig = await pgContainer.start()

  process.env.POSTGRES_PORT = String(containerConfig.port)
  await config.load('test') // config must be reloaded to apply new env vars

  const { db } = await pgTestContext.makeClient()

  await migrate(db, { migrationsFolder: config.get('MIGRATION_FOLDER') })
}

export async function teardown(): Promise<void> {
  const { pg } = pgTestContext.getClient()

  await pg.end()
  await pgContainer.stop()
}



