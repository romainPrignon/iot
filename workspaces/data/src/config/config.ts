import is from '@sindresorhus/is'
import defaultConf from './default.js'
import { appEnvSchema, configSchema, type ConfigKeys, type ConfigMap } from './config.schema.js'

type Config = {
  configMap?: ConfigMap
  load(env?: NodeJS.ProcessEnv): Promise<void>
  get<Key extends ConfigKeys>(configKey: Key): ConfigMap[Key]
}

const config = (): Config => {
  return {
    async load(env = process.env) {
      appEnvSchema.parse(env.APP_ENV)

      const envConf: () => ConfigMap = (await import(`./${env.APP_ENV}.js`)).default

      this.configMap = configSchema.parse({
        ...defaultConf(env),
        ...envConf()
      })
    },
    get(configKey) {
      if (is.undefined(this.configMap)) {
        throw new Error('The config should be loaded first with config.load()')
      }
      return this.configMap[configKey]
    }
  }
}


export default config()
