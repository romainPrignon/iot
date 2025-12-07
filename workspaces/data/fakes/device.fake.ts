import type { DeviceModel } from "../src/models/device.model.js"
import { makeId } from "@iot/libs"
import { faker } from '@faker-js/faker'
import { subDays } from "date-fns"

const randomDaysAtMost = (n: number) => Math.floor(Math.random() * n)

export const fakeDeviceModel = (partial?: Partial<DeviceModel>): DeviceModel => {
  return {
    id: makeId(),
    serial: faker.string.alphanumeric(16), // TODO: might throw a Not Unique Error
    created_at: subDays(new Date(), randomDaysAtMost(100)),
    ...partial,
  }
}
