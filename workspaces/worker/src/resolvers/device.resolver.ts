import z from "zod"
import { type Drizzle } from '@iot/data'
import { ElysiaContextException } from "../app/exception.js"
import * as entity from "../entities/device.entity.js"
import * as usecase from '../usecases/device.usecase.js'
import { makeId } from "@iot/libs"

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

  // this pattern is for demonstration. use reference instead
  if (!drizzle) throw new ElysiaContextException("Missing drizzle instance")

  const device = entity.device({
    id: makeId(),
    serial: body.data.serial,
    createdAt: new Date(),
  })

  const createdDevice = await usecase.createDevice(device)

  return {
    data: {
      id: createdDevice.id
    },
  }
}


export {
  createDevice,
  createDeviceBody,
  createDeviceResponse,
  headers
}
