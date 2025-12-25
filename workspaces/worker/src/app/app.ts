import { Elysia, type AnyElysia, type ElysiaAdapter } from "elysia"
import { fromTypes, openapi } from '@elysiajs/openapi'
import { makeDeviceRouter } from "../routers/device.router.js"
import z from "zod"
import type { Drizzle } from "@iot/data"


type AppArg = {
  adapter: ElysiaAdapter
  drizzle: Drizzle
}

const makeApp = (arg: AppArg): AnyElysia => {
  const app = new Elysia({ adapter: arg.adapter })
    .use(openapi({
      references: fromTypes(),
      mapJsonSchema: {
        zod: z.toJSONSchema
      }
    }))
    .decorate('drizzle', arg.drizzle)
    .use(makeDeviceRouter())

  return app
}


export {
  makeApp
}
