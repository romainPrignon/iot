import { z } from 'zod'
import { tables } from '../table.js'
import * as constants from './constants.js'

export const tableSchema = z.enum(tables)

export const appEnvSchema = z.enum([constants.env.development, constants.env.test, constants.env.production])

export const configSchema = z.object({
  APP_NAME: z.string().min(1),
  APP_ENV: appEnvSchema,
  LOG_LEVEL: z.enum([constants.logLevel.debug, constants.logLevel.info, constants.logLevel.error]),
  POSTGRES_HOST: z.string().min(1),
  POSTGRES_PORT: z.coerce.number().int().positive(),
  POSTGRES_USER: z.string().min(1),
  POSTGRES_PASSWORD: z.string().min(1),
  POSTGRES_DB: z.string().min(1),
  METRICS_ENABLED: z.coerce.boolean(),
  SEEDS: z.array(tableSchema).min(1)
})

export type ConfigMap = z.infer<typeof configSchema>
export type ConfigKeys = keyof ConfigMap
