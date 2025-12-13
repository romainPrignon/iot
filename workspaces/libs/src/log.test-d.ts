import { describe, test, expectTypeOf } from 'vitest'
import { logLevel } from './log.js'

describe('log', () => {
  describe('logLevel', () => {
    test('should have correct type structure', () => {
      expectTypeOf<{
        readonly debug: 'debug'
        readonly info: 'info'
        readonly error: 'error'
      }>(logLevel)
    })

    test('should have correct property types', () => {
      expectTypeOf<'debug'>(logLevel.debug)
      expectTypeOf<'info'>(logLevel.info)
      expectTypeOf<'error'>(logLevel.error)
    })

    test('should be readonly', () => {
      // @ts-expect-error Cannot assign to 'debug' because it is a read-only property
      logLevel.debug = 'modified'

      // @ts-expect-error Cannot assign to 'info' because it is a read-only property
      logLevel.info = 'modified'

      // @ts-expect-error Cannot assign to 'error' because it is a read-only property
      logLevel.error = 'modified'
    })
  })
})
