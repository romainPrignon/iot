import { z } from 'zod'

export const env = {
  development: 'development',
  test: 'test',
  production: 'production'
} as const

export const envSchema = z.literal([env.development, env.test, env.production]).readonly()
export type Env = z.infer<typeof envSchema>
