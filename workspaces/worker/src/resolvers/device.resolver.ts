import z from "zod"


// TODO: might go in a shared folder
const headers = z.object({
  authorization: z.string().regex(/Bearer .+/)
})

const createDeviceBody = z.object({
  data: z.object({
    temp: z.number()
  })
})
type CreateDeviceBody = z.infer<typeof createDeviceBody>

const createDeviceResponse = z.object({
  data: z.object({
    id: z.string()
  })
})
type CreateDeviceResponse = z.infer<typeof createDeviceResponse>

type createDeviceContext = {
  body: CreateDeviceBody
}

const createDevice = (_ctx: createDeviceContext): CreateDeviceResponse => {
  return {
    data: {
      id: '111',
    },
  }
}


export {
  createDevice,
  createDeviceBody,
  createDeviceResponse,
  headers
}
