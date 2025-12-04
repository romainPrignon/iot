import { type NodePgClient, NodePgDatabase, drizzle } from 'drizzle-orm/node-postgres'
import * as schema from '../schema.js'

export const makeDrizzle = (pg: NodePgClient): NodePgDatabase<typeof schema> =>
  drizzle(pg, { schema })
