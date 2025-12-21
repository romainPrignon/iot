import { Elysia, type AnyElysia } from "elysia"
import { createDevice, createDeviceBody, createDeviceResponse, headers } from "../resolvers/device.resolver.js"


const makeDeviceRouter = (): AnyElysia => {
  return new Elysia()
    .onError(({ error }) => {

      // TODO: better error reporting
      console.log(error)

      return {
        data: null,
        error: {
          // it may contain a code
          ...error,
          // @ts-expect-error error instance have name
          name: error.name,
          // @ts-expect-error error instance have message
          message: error.message,
        }
      }
    })
    .post('/devices', createDevice, {
      headers,
      body: createDeviceBody,
      response: createDeviceResponse
    })
}


export {
  makeDeviceRouter
}
