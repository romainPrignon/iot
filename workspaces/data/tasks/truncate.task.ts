import 'dotenv/config'
import { argv } from 'zx'
import * as schema from '../src/schema.js'
import { makePgClient, makePgConfig } from '../src/app/pg.js'
import { makeDrizzle } from '../src/app/drizzle.js'
import { ConfigException } from '../src/app/exception.js'
import config from '../src/app/config.js'

type Argv = typeof argv

const truncate = async (_argv: Argv): Promise<void> => {
  await config.load('development')
  const seeds = config.get('SEEDS')

  await using pg = makePgClient(makePgConfig(config))
  const drizzle = makeDrizzle(pg)

  await pg.connect()

  for (const entity of seeds.reverse()) {

    if (!(entity in schema)) throw new ConfigException(`invalid entity "${entity}" in config.SEEDS`)

    const table = schema[entity]

    await drizzle.delete(table)
  }
}

await truncate(argv)
