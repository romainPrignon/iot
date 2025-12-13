import { describe, it, expect } from 'vitest'
import { makePgClient, makePgPool } from './pg.js'
import { Client, Pool } from 'pg'
import config from './config.js'

describe('makePgClient', () => {
  it('should return a client instance', async () => {
    // Arrange
    await config.load('test')

    // Act
    const result = makePgClient()

    // Assert
    expect(result).toBeInstanceOf(Client)
    expect(result[Symbol.asyncDispose]).toBeInstanceOf(Function)
  })

  // eslint-disable-next-line vitest/expect-expect
  it('should dispose at the end of scope', async () => {
    // Arrange
    await config.load('test')

    // Act
    await using _result = makePgClient()

    // Assert
    // should dispose
  })
})

describe('makePgPool', () => {
  it('should return a pool instance', async () => {
    // Arrange
    await config.load('test')

    // Act
    const result = makePgPool()

    // Assert
    expect(result).toBeInstanceOf(Pool)
    expect(result[Symbol.asyncDispose]).toBeInstanceOf(Function)
  })

  // eslint-disable-next-line vitest/expect-expect
  it('should dispose at the end of scope', async () => {
    // Arrange
    await config.load('test')

    // Act
    await using _result = makePgPool()

    // Assert
    // should dispose
  })
})
