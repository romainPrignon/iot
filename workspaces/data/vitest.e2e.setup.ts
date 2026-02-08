import { beforeAll, afterAll } from "vitest"
import config from "./src/app/config.js"
import { pgTestContext } from "./e2e/pg.context.js"

beforeAll(async () => {
  await config.load('test')
  await pgTestContext.makeClient()
})

afterAll(async () => {
  const { pg } = pgTestContext.getClient()
  await pg.end()
})
