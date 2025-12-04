import { describe, it, expect } from 'vitest'
import { makeDrizzle } from './drizzle.js'
import { fromPartial } from '@total-typescript/shoehorn'
import { NodePgDatabase, type NodePgClient } from 'drizzle-orm/node-postgres'

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
