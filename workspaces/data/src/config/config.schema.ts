import { z } from 'zod'
import { tables } from '../table.js'
import { logLevel, envSchema } from '@iot/libs'

export const tableSchema = z.literal(tables)

const configSchema = z.object({
  APP_NAME: z.string().min(1),
  APP_ENV: envSchema,
  LOG_LEVEL: z.literal([logLevel.debug, logLevel.info, logLevel.error]),
  POSTGRES_VERSION: z.coerce.number().int().positive().min(18),
  POSTGRES_HOST: z.string().min(1),
  POSTGRES_PORT: z.coerce.number().int().positive(),
  POSTGRES_USER: z.string().min(1),
  POSTGRES_PASSWORD: z.string().min(1),
  POSTGRES_DB: z.string().min(1),
  METRICS_ENABLED: z.coerce.boolean(),
  MIGRATION_FOLDER: z.string(),
  SEEDS: z.array(tableSchema).min(1)
}).readonly()

export default configSchema
export type ConfigMap = z.infer<typeof configSchema>
export type ConfigKeys = keyof ConfigMap
