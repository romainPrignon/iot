import 'dotenv/config'

import { argv } from 'zx'
import * as schema from '../src/schema.js'
import { makePgClient, makePgConfig } from '../src/app/pg.js'
import { makeDrizzle } from '../src/app/drizzle.js'
import { ConfigException } from '../src/app/exception.js'
import config from '../src/app/config.js'

type Argv = typeof argv

const seed = async (_argv: Argv): Promise<void> => {
  await config.load('development')
  const seeds = config.get('SEEDS')

  await using pg = makePgClient(makePgConfig(config))
  const drizzle = makeDrizzle(pg)

  await pg.connect()

  for (const entity of seeds) {

    if (!(entity in schema)) throw new ConfigException(`invalid entity "${entity}" in config.SEEDS`)

    const table = schema[entity]
    const fileName = `${entity}.seed.ts` as const

    // eslint-disable-next-line n/no-unsupported-features/node-builtins
    const { default: data } = await import(`${import.meta.dirname}/../seeds/${fileName}`)

    data.length && (await drizzle.insert(table).values(data))
  }

}

await seed(argv)
