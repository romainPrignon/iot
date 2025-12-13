import { resolve } from 'node:path'
import { Config } from '@iot/libs'
import { type ConfigMap } from '../config/config.schema.js'

export default new Config<ConfigMap>(resolve('./src/config'))
