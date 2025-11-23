import { pgTable, uuid, varchar, timestamp, integer, index, primaryKey } from 'drizzle-orm/pg-core'

export const device = pgTable('device', {
  id: uuid().primaryKey(),
  serial: varchar({ length: 16 }).notNull().unique(),
  created_at: timestamp({ mode: 'date', precision: 3 }).defaultNow().notNull(),
})

// TODO: partition by time and zone
export const weather = pgTable('weather', {
  time: timestamp({ mode: 'date', precision: 3 }).notNull(),
  zone: integer().notNull(),
  temp: integer().notNull(),
  device_id: uuid().notNull().references(() => device.id),
},
  (table) => [
    primaryKey({ columns: [table.device_id, table.time, table.zone] }),
    index('weather_time_zone_idx').on(table.time, table.zone),
  ])
