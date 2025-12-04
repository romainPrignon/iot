import { describe, it, expect } from 'vitest'
import { makeId } from './id.js'

describe('makeId', () => {
  it('should return an uuid instance', () => {
    // Arrange

    // Act
    const result = makeId()

    // Assert
    expect(result).toMatch(/^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i)
  })
})
