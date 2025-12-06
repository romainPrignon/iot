import { fakeWeatherModel } from "../fakes/weather.fake.js"
import deviceSeed from "./device.seed.js"

export default Array.from({ length: 10_000 }, () => {
  return fakeWeatherModel({
    device_id: deviceSeed[Math.floor(Math.random() * deviceSeed.length)]?.id
  })
})
