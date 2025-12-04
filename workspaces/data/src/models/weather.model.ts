import type { InferSelectModel } from 'drizzle-orm'
import { weather } from '../schema.js'

export type WeatherModel = InferSelectModel<typeof weather>
