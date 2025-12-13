import { z } from "zod"

const configSchema = z.object({
  foo: z.literal('bar'),
  baz: z.literal('qux')
})

export default configSchema
export type ConfigMap = z.infer<typeof configSchema>
