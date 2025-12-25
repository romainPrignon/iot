import { describe, it, expect } from 'vitest'
import { makePgClient, makePgConfig, makePgPool } from './pg.js'
import { Client, Pool } from 'pg'
import config from './config.js'

describe('makePgClient', () => {
  it('should return a client instance', async () => {
    // Arrange
    const config = {}

    // Act
    const result = makePgClient(config)

    // Assert
    expect(result).toBeInstanceOf(Client)
    expect(result[Symbol.asyncDispose]).toBeInstanceOf(Function)
  })

  // eslint-disable-next-line vitest/expect-expect
  it('should dispose at the end of scope', async () => {
    // Arrange
    const config = {}

    // Act
    await using _result = makePgClient(config)

    // Assert
    // should dispose
  })
})

describe('makePgPool', () => {
  it('should return a pool instance', async () => {
    // Arrange
    const config = {}

    // Act
    const result = makePgPool(config)

    // Assert
    expect(result).toBeInstanceOf(Pool)
    expect(result[Symbol.asyncDispose]).toBeInstanceOf(Function)
  })

  // eslint-disable-next-line vitest/expect-expect
  it('should dispose at the end of scope', async () => {
    // Arrange
    const config = {}

    // Act
    await using _result = makePgPool(config)

    // Assert
    // should dispose
  })
})
describe('makePgConfig', () => {
  it('should return correct configuration object', async () => {
    // Arrange
    await config.load('test')
    // Act
    const result = makePgConfig(config)

    // Assert
    expect(result).toEqual(expect.objectContaining({
      host: expect.any(String),
      port: expect.any(Number),
      database: expect.any(String),
      user: expect.any(String),
      password: expect.any(String)
    }))
  })
})
