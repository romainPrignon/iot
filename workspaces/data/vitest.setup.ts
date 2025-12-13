import { beforeAll } from 'vitest'
import { Config } from '@iot/libs'
import { resolve } from 'node:path'

const config = new Config(resolve('./src/config'))

beforeAll(async () => {
  process.env = {
    ...process.env,
    APP_ENV: 'test'
  }

  await config.load('test')
})
