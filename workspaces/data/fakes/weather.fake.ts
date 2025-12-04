import type { WeatherModel } from "../src/models/weather.model.js"
import { fakerFR as faker } from '@faker-js/faker'
import { subDays } from "date-fns"
import { makeId } from "../src/app/id.js"

const randomDaysAtMost = (n: number) => Math.floor(Math.random() * n)

export const fakeWeatherModel = (partial?: Partial<WeatherModel>): WeatherModel => {
  return {
    time: subDays(new Date(), randomDaysAtMost(100)),
    zone: Number(faker.location.zipCode()), // TODO migrate
    temp: faker.number.int({ min: -100, max: 100 }),
    device_id: makeId(),
    ...partial,
  }
}
