import { type NodePgClient, NodePgDatabase, drizzle } from 'drizzle-orm/node-postgres'
import * as schema from '../schema.js'
import { DatabaseException } from './exception.js'

export type Drizzle = ReturnType<typeof makeDrizzle>

export const makeDrizzle = (pg: NodePgClient): NodePgDatabase<typeof schema> =>
  drizzle(pg, { schema })

export const withError = async <R>(query: () => Promise<R>): Promise<R> => {
  try {
    return await query()
  } catch (err) {
    throw new DatabaseException('database interaction error. see https://www.postgresql.org/docs/current/errcodes-appendix.html', { cause: err, context: { code: err?.cause?.code } })
  }
}
