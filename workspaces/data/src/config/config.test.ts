import { describe, expect, test } from 'vitest'
import config from './config.js'

describe('load', () => {
  test('config should contains the minimum loaded config for test', async () => {
    // Assert
    expect(config.configMap).toMatchInlineSnapshot(`
      {
        "APP_ENV": "test",
        "APP_NAME": "@iot/data",
        "LOG_LEVEL": "info",
        "METRICS_ENABLED": false,
        "POSTGRES_DB": "iot",
        "POSTGRES_HOST": "localhost",
        "POSTGRES_PASSWORD": "postgres",
        "POSTGRES_PORT": 5432,
        "POSTGRES_USER": "postgres",
        "SEEDS": [
          "device",
          "weather",
        ],
      }
    `)
  })

  test('it should fail to load an empty env because we require at least APP_ENV', async () => {
    // Act
    const err = () => config.load({})

    // Assert
    await expect(err).rejects.toMatchInlineSnapshot(`
        [ZodError: [
          {
            "code": "invalid_value",
            "values": [
              "development",
              "test",
              "production"
            ],
            "path": [],
            "message": "Invalid option: expected one of \\"development\\"|\\"test\\"|\\"production\\""
          }
        ]]
      `)
  })
})

describe('get', () => {
  test('it should retrieve the config value', async () => {
    // Act
    const output = config.get('APP_ENV')

    // Assert
    expect(output).toEqual('test')
  })

  test('it should not get the key not present in schema and present in env var', async () => {
    // Arrange
    await config.load({
      APP_ENV: 'test', // required in schema
      NOT_IN_SCHEMA: 'true'
    })

    // Act
    // @ts-expect-error we do want to be unsafe here
    const output = config.get('NOT_IN_SCHEMA')

    // Assert
    expect(output).toEqual(undefined) // not parsed by our zod schema
  })

  test('it should not get the key not present in schema and not present in env var', async () => {
    // Arrange
    await config.load({
      APP_ENV: 'test'
      // <-- NOT_IN_SCHEMA not in env var as well
    })

    // Act
    // @ts-expect-error we do want to be unsafe here
    const output = config.get('NOT_IN_SCHEMA')

    // Assert
    expect(output).toEqual(undefined) // not parsed by our zod schema
  })
})
