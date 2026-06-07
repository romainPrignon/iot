import type { ReadonlyDeep } from 'type-fest'
import type { Id } from '@iot/libs'
import type { Metadata } from '../../types/metadata.js'

export type Device = Metadata & ReadonlyDeep<{
  id: Id
  serial: string // todo branded type
}>

export const device = (input: Device): Device => {
  return { ...input }
}
