import type { ZodType } from "zod"
import { envSchema, type Env } from "./env.js"
import { ConfigException } from "./exception.js"
import { isAbsolute } from 'node:path'

type ConfigLoader<T> = () => T
type DefaultConfigLoader<T> = (env: NodeJS.ProcessEnv) => T

export class Config<T extends Record<string, unknown>> {
  private config?: T
  private path: string

  constructor(path: string) {
    if (!isAbsolute(path)) throw new ConfigException('path must be absolute')
    this.path = path
  }
  async load(env: Env): Promise<void> {
    const parsedEnv = envSchema.parse(env)

    const schema: ZodType<T> | undefined = (await import(`${this.path}/config.schema.js`)).default
    const defaultConf: DefaultConfigLoader<T> = (await import(`${this.path}/default.config.js`)).default
    const envBasedConf: ConfigLoader<T> = (await import(`${this.path}/${parsedEnv}.config.js`)).default

    if (!schema) throw new ConfigException('invalid config.schema.js file')
    if (!(typeof defaultConf === 'function')) throw new ConfigException('invalid default.config.js file')
    if (!(typeof envBasedConf === 'function')) throw new ConfigException(`invalid ${parsedEnv}.config.js file`)

    this.config = schema.parse({
      ...defaultConf(process.env),
      ...envBasedConf()
    })
  }
  get<Key extends keyof T>(configKey: Key): T[Key] {
    if (!this.config) {
      throw new ConfigException('The config should be loaded first with config.load()')
    }
    return this.config[configKey]
  }
}
