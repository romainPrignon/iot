import { describe, expect, it, vi } from 'vitest'
import { reference } from './reference'
import { run } from './scope'

describe('reference', () => {
  describe('get', () => {
    it('should throw an error if get is not called within a scope', async () => {
      // Arrange
      const someRef = reference('something')

      // Act
      const result = () => someRef.get()

      // Assert
      expect(result).toThrowErrorMatchingInlineSnapshot(
        `[Error: get() must be called within a scope. make sure to call scope.run() first]`
      )
    })

    it('should throw an error if the key is not in store', async () => {
      // Arrange
      const someRef = reference('something')

      // Act
      const result = () => run(() => someRef.get())

      // Assert
      expect(result).toThrowErrorMatchingInlineSnapshot(
        `[Error: missing key "something" in scope. make sure to call ref.set() first]`
      )
    })

    it('should return the value of the key', async () => {
      // Arrange
      const someRef = reference('something')

      // Act
      const result = run(() => {
        someRef.set(42)
        return someRef.get()
      })

      // Assert
      expect(result).toEqual(42)
    })
  })

  describe('set', () => {
    it('should throw an error if set is not called within a scope', async () => {
      // Arrange
      const someRef = reference('something')

      // Act
      const result = () => someRef.set(42)

      // Assert
      expect(result).toThrowErrorMatchingInlineSnapshot(
        `[Error: set() must be called within a scope. make sure to call scope.run() first]`
      )
    })

    it('should correctly set the value of the key', async () => {
      // Arrange
      const someRef = reference('something')

      // spy
      vi.spyOn(someRef, 'set')

      // Act
      run(() => {
        someRef.set(42)
      })

      expect(someRef.set).toHaveBeenCalledWith(42)
    })

    it('should not be possible to override ref', async () => {
      // Arrange
      const someRef = reference('something')

      // Act
      run(() => {
        someRef.set(42)

        // Assert
        expect(() => someRef.set(43)).toThrowErrorMatchingInlineSnapshot(
          `[Error: reference "something" already set. References are immutable and cannot be overridden]`
        )
      })
    })
  })

  describe('name', () => {
    it('should return the reference name from the key', async () => {
      // Arrange
      const someRef = reference('something')

      // Assert
      expect(someRef.name).toEqual('something')
    })
  })

  describe('has', () => {
    it('should throw an error if has is not called within a scope', async () => {
      // Arrange
      const someRef = reference('something')

      // Act
      const result = () => someRef.has()

      // Assert
      expect(result).toThrowErrorMatchingInlineSnapshot(
        `[Error: has() must be called within a scope. make sure to call scope.run() first]`
      )
    })

    it('should return false if the key is not in store', async () => {
      // Arrange
      const someRef = reference('something')

      // Act
      const result = run(() => someRef.has())

      // Assert
      expect(result).toBe(false)
    })

    it('should return true if the key is in store', async () => {
      // Arrange
      const someRef = reference('something')

      // Act
      const result = run(() => {
        someRef.set(42)
        return someRef.has()
      })

      // Assert
      expect(result).toBe(true)
    })
  })
})
