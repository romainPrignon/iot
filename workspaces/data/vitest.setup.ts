import { beforeAll } from 'vitest'
import config from './src/config/config.js'

beforeAll(async () => {
  process.env = {
    ...process.env,
    APP_ENV: 'test'
  }

  await config.load(process.env)
})
