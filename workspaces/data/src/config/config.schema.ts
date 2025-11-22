import * as constants from './constants.js'
import { z } from 'zod'

export const appEnvSchema = z.enum([constants.env.development, constants.env.test, constants.env.production])

export const configSchema = z.object({
  APP_ENV: appEnvSchema,
  LOG_LEVEL: z.enum([constants.logLevel.debug, constants.logLevel.info, constants.logLevel.error]),
  POSTGRES_HOST: z.string().min(1),
  POSTGRES_PORT: z.coerce.number().int().positive(),
  POSTGRES_USER: z.string().min(1),
  POSTGRES_PASSWORD: z.string().min(1),
  POSTGRES_DB: z.string().min(1),
  METRICS_ENABLED: z.coerce.boolean()
})

export type ConfigMap = z.infer<typeof configSchema>
export type ConfigKeys = keyof ConfigMap
