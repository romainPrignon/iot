import { describe, it, expect } from 'vitest'
import { makePgClient, makePgPool } from './pg.js'
import { Client, Pool } from 'pg'

describe('makePgClient', () => {
  it('should return a client instance', () => {
    // Arrange

    // Act
    const result = makePgClient()

    // Assert
    expect(result).toBeInstanceOf(Client)
    expect(result[Symbol.asyncDispose]).toBeInstanceOf(Function)
  })

  // eslint-disable-next-line vitest/expect-expect
  it('should dispose at the end of scope', async () => {
    // Arrange

    // Act
    await using _result = makePgClient()

    // Assert
    // should dispose
  })
})

describe('makePgPool', () => {
  it('should return a pool instance', () => {
    // Arrange

    // Act
    const result = makePgPool()

    // Assert
    expect(result).toBeInstanceOf(Pool)
    expect(result[Symbol.asyncDispose]).toBeInstanceOf(Function)
  })

  // eslint-disable-next-line vitest/expect-expect
  it('should dispose at the end of scope', async () => {
    // Arrange

    // Act
    await using _result = makePgPool()

    // Assert
    // should dispose
  })
})
