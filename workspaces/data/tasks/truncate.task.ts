import 'dotenv/config'
import { argv } from 'zx'
import * as schema from '../src/schema.js'
import { makePgClient } from '../src/app/pg.js'
import { makeDrizzle } from '../src/app/drizzle.js'
import config from '../src/config/config.js'

type Argv = typeof argv

const truncate = async (_argv: Argv) => {
  await config.load()
  const seeds = config.get('SEEDS')

  await using pg = makePgClient()
  const drizzle = makeDrizzle(pg)

  await pg.connect()

  for (const entity of seeds.reverse()) {
    const table = schema[entity]

    await drizzle.delete(table)
  }
}

await truncate(argv)
