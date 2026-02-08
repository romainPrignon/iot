import { describe, expect, it } from "vitest"
import { truncate } from "./truncate.task.js"
import { device } from "../src/schema.js"
import { pgTestContext } from "../e2e/pg.context.js"
import { fakeDeviceModel } from "../fakes/device.fake.js"

describe('truncate', () => {
  it('should truncate the db', async () => {
    // Given
    const { db } = pgTestContext.getClient()
    await db.insert(device).values([fakeDeviceModel()])

    // When
    await truncate({ env: 'test' })

    // Then
    const devices = await db.select().from(device)
    expect(devices.length).toEqual(0)
  })
})
