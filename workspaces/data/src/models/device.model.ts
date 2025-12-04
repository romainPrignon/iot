import type { InferSelectModel } from 'drizzle-orm'
import { device } from '../schema.js'

export type DeviceModel = InferSelectModel<typeof device>
