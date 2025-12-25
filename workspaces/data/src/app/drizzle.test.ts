import { describe, it, expect, vi } from 'vitest'
import { makeDrizzle, withError } from './drizzle.js'
import { fromPartial } from '@total-typescript/shoehorn'
import { NodePgDatabase, type NodePgClient } from 'drizzle-orm/node-postgres'
import { DatabaseException } from './exception.js'

describe('makeDrizzle', () => {
  it('should return a drizzle instance', () => {
    // Arrange
    const pg = fromPartial<NodePgClient>({})

    // Act
    const result = makeDrizzle(pg)

    // Assert
    expect(result).toBeInstanceOf(NodePgDatabase)
  })
})
describe('withError', () => {
  it('should return the result when query succeeds', async () => {
    // Arrange
    const expectedResult = { id: 1, name: 'test' }
    const mockQuery = vi.fn().mockResolvedValue(expectedResult)

    // Act
    const result = await withError(mockQuery)

    // Assert
    expect(result).toEqual(expectedResult)
  })

  it('should throw DatabaseException when query throws error with cause code', async () => {
    // Arrange
    const originalError = { cause: { code: 'UNIQUE_VIOLATION' } }
    const mockQuery = vi.fn().mockRejectedValue(originalError)

    // Act
    const result = () => withError(mockQuery)
    // Assert
    await expect(result).rejects.toThrow(DatabaseException)
  })

  it('should throw DatabaseException when query throws error without cause', async () => {
    // Arrange
    const originalError = new Error('Database connection failed')
    const mockQuery = vi.fn().mockRejectedValue(originalError)

    // Act
    const result = () => withError(mockQuery)
    // Assert
    await expect(result).rejects.toThrow(DatabaseException)
  })
})
