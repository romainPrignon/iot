import { z } from "zod"

export default z.object({
  foo: z.literal('bar')
})
