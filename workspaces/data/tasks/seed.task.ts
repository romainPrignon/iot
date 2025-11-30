import 'dotenv/config'

import { argv } from 'zx'
import * as schema from '../src/schema.js'
import { makePgClient } from '../src/app/pg.js'
import { makeDrizzle } from '../src/app/drizzle.js'
import config from '../src/config/config.js'

type Argv = typeof argv

const seed = async (_argv: Argv) => {
  await config.load()
  const seeds = config.get('SEEDS')

  await using pg = makePgClient()
  const drizzle = makeDrizzle(pg)

  await pg.connect()

  for (const entity of seeds) {

    const table = schema[entity] // TODO: guard wrong entity name in config
    const fileName = `${entity}.seed.ts` as const

    // eslint-disable-next-line n/no-unsupported-features/node-builtins
    const { default: data } = await import(`${import.meta.dirname}/../seeds/${fileName}`)

    data.length && (await drizzle.insert(table).values(data))
  }

}

await seed(argv)
