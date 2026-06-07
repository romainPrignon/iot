import { describe, expect, it, vi } from 'vitest'
import { run } from './scope'

describe('scope', () => {
  describe('run', () => {
    it('should return the value of the callback', async () => {
      // Arrange
      const cb = vi.fn().mockReturnValue(42)

      // Act
      const result = run(cb)

      // Assert
      expect(result).toEqual(42)
    })

    it('should handle async callback', async () => {
      // Arrange
      const cb = vi.fn().mockResolvedValue(42)

      // Act
      const result = await run(cb) // <-- notice the await

      // Assert
      expect(result).toEqual(42)
    })
  })
})
