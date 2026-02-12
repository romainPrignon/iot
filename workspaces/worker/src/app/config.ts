import { resolve } from 'node:path'
import { Config } from '@iot/libs'
import { type ConfigMap } from '../config/config.schema.js'

// eslint-disable-next-line n/no-unsupported-features/node-builtins
export default new Config<ConfigMap>(resolve(import.meta.dirname + '/../config'))
