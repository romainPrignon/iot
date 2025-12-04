import 'dotenv/config'

import { argv } from 'zx'
import * as schema from '../src/schema.js'
import { makePgClient } from '../src/app/pg.js'
import { makeDrizzle } from '../src/app/drizzle.js'
import config from '../src/config/config.js'
import { ConfigException } from '../src/app/exception.js'

type Argv = typeof argv

const seed = async (_argv: Argv) => {
  await config.load()
  const seeds = config.get('SEEDS')

  await using pg = makePgClient()
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
