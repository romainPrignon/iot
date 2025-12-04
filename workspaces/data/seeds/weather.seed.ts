import { fakeWeatherModel } from "../fakes/weather.fake.js"
import deviceSeed from "./device.seed.js"

export default Array.from({ length: 10_000 }, (_, index) => {
  return fakeWeatherModel({
    device_id: deviceSeed[index % deviceSeed.length]?.id
  })
})
