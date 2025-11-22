import 'dotenv/config'
import { defineConfig } from 'drizzle-kit'
import config from './src/config/config.js'

await config.load(process.env)

export default defineConfig({
  dialect: 'postgresql',
  out: './drizzle',
  schema: './src/schema.ts',
  dbCredentials: {
    host: config.get('POSTGRES_HOST'),
    port: config.get('POSTGRES_PORT'),
    user: config.get('POSTGRES_USER'),
    password: config.get('POSTGRES_PASSWORD'),
    database: config.get('POSTGRES_DB'),
  },
  verbose: true,
  strict: true,
  introspect: {
    casing: 'preserve'
  }
})
