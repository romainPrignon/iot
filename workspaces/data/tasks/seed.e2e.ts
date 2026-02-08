import { describe, expect, it } from "vitest"
import { seed } from "./seed.task.js"
import { device } from "../src/schema.js"
import { pgTestContext } from "../e2e/pg.context.js"

describe('seed', () => {
  it('should seed the db', async () => {
    // Given
    const { db } = pgTestContext.getClient()

    // When
    await seed({ env: 'test' })

    // Then
    const devices = await db.select().from(device)
    expect(devices.length).toEqual(10000)
  })
})
