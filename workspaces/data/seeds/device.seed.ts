import { fakeDeviceModel } from "../fakes/device.fake.js"

export default Array.from({ length: 10_000 }, () => {
  return fakeDeviceModel()
})
