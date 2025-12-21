import { z } from 'zod'
import { logLevel, envSchema } from '@iot/libs'

const configSchema = z.object({
  APP_NAME: z.string().min(1),
  APP_ENV: envSchema,
  PORT: z.number().min(1024).max(65535),
  LOG_LEVEL: z.literal([logLevel.debug, logLevel.info, logLevel.error]),
  POSTGRES_HOST: z.string().min(1),
  POSTGRES_PORT: z.coerce.number().int().positive(),
  POSTGRES_USER: z.string().min(1),
  POSTGRES_PASSWORD: z.string().min(1),
  POSTGRES_DB: z.string().min(1),
  METRICS_ENABLED: z.coerce.boolean(),
}).readonly()

export default configSchema
export type ConfigMap = z.infer<typeof configSchema>
export type ConfigKeys = keyof ConfigMap
