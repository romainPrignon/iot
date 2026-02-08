import 'dotenv/config'

import { argv } from 'zx'
import * as schema from '../src/schema.js'
import { makePgClient, makePgConfig } from '../src/app/pg.js'
import { makeDrizzle } from '../src/app/drizzle.js'
import { ConfigException } from '../src/app/exception.js'
import config from '../src/app/config.js'
import type { Env } from '@iot/libs'

type Argv = { env: Env }

export const truncate = async (argv: Argv): Promise<void> => {
  await config.load(argv.env)
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

// eslint-disable-next-line n/no-unsupported-features/node-builtins
if (import.meta.main) {
  await truncate(argv as unknown as Argv)
}
