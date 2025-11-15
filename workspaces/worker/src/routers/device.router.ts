import { Elysia, type AnyElysia } from "elysia"
import { createDevice, createDeviceBody, createDeviceResponse, headers } from "../resolvers/device.resolver.js"


const makeDeviceRouter = (): AnyElysia => {
  return new Elysia()
    .post('/devices', createDevice, {
      headers,
      body: createDeviceBody,
      response: createDeviceResponse
    })
}


export {
  makeDeviceRouter
}
