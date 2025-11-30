import * as schema from './schema.js'

export type Table = Array<keyof typeof schema>

export const tables = Object.keys(schema) as Table
