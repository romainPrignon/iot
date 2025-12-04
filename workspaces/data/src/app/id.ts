import { v7 } from 'uuid'

export type Id = `${string}-${string}-${string}-${string}-${string}`

export const makeId = (): Id => v7() as Id
