import {describe, expect, it} from 'vitest'
import { main } from './main.js'

describe('main', () => {
  it('should works', () => {
    expect(main(process)).toEqual(undefined)
  })
})
