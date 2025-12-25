import z from "zod"
import { schema, withError, type Drizzle } from '@iot/data'
import { makeId } from '@iot/libs'
import { ElysiaContextException } from "../app/exception.js"

// TODO: might go in a shared folder
const headers = z.object({
  authorization: z.string().regex(/Bearer .+/)
}).readonly()

const createDeviceBody = z.object({
  data: z.object({
    serial: z.hex().length(16)
  })
}).readonly()
type CreateDeviceBody = z.infer<typeof createDeviceBody>

const createDeviceResponse = z.object({
  data: z.object({
    id: z.uuidv7()
  })
}).readonly()
type CreateDeviceResponse = z.infer<typeof createDeviceResponse>

type CreateDeviceContext = {
  body: CreateDeviceBody
  drizzle?: Drizzle
}

const createDevice = async (ctx: CreateDeviceContext): Promise<CreateDeviceResponse> => {
  const { body, drizzle } = ctx

  if (!drizzle) throw new ElysiaContextException("Missing drizzle instance")

  const device = {
    id: makeId(),
    serial: body.data.serial,
    created_at: new Date()
  }

  await withError(() => drizzle.insert(schema.device).values([device]))

  return {
    data: {
      id: device.id,
    },
  }
}


export {
  createDevice,
  createDeviceBody,
  createDeviceResponse,
  headers
}
