import { Elysia, type AnyElysia, type ElysiaAdapter } from "elysia"
import { fromTypes, openapi } from '@elysiajs/openapi'
import { makeDeviceRouter } from "../routers/device.router.js"
import z from "zod"


type AppArg = {
  adapter: ElysiaAdapter
}

const makeApp = (arg: AppArg): AnyElysia => {
  const app = new Elysia({ adapter: arg.adapter })
    .use(openapi({
      references: fromTypes(),
      mapJsonSchema: {
        zod: z.toJSONSchema
      }
    }))
    .use(makeDeviceRouter())

  return app
}


export {
  makeApp
}
