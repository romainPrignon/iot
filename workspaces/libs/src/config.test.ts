import { describe, expect, test } from 'vitest'
import { Config } from './config.js'
import { resolve } from 'node:path'
import { type ConfigMap } from '../fixtures/valid-config/config.schema.js'

describe('Config', () => {
  describe('load', () => {
    test('should fail to load config for wrong env', async () => {
      // Arrange
      const path = '/some-path'
      const config = new Config(path)

      // Act
      // @ts-expect-error Argument of type '"invalid"' is not assignable to parameter of type Env
      const result = () => config.load('invalid')

      // Assert
      await expect(result).rejects.toMatchInlineSnapshot(`
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

    test('should fail to load not absolute config path', async () => {
      // Arrange
      const path = 'some-path'

      // Act
      const result = () => new Config(path)

      // Assert
      expect(result).toThrowErrorMatchingInlineSnapshot(`[ConfigException: path must be absolute]`)
    })

    test('should fail to load missing schema config', async () => {
      // Arrange
      const path = '/some-path'
      const config = new Config(path)

      // Act
      const result = () => config.load('test')

      // Assert
      await expect(result).rejects.toMatchInlineSnapshot(`[Error: Cannot find module '/some-path/config.schema.js' imported from '/home/romainprignon/workspace/romainprignon/iot/workspaces/libs/src/config.ts']`)
    })

    test('should fail to load missing default config', async () => {
      // Arrange
      const path = resolve('fixtures/missing-default-config')
      const config = new Config(path)

      // Act
      const result = () => config.load('test')

      // Assert
      await expect(result).rejects.toThrowError(/Cannot find module .*default\.config\.js/)
    })

    test('should fail to load missing env config', async () => {
      // Arrange
      const path = resolve('fixtures/missing-test-config')
      const config = new Config(path)

      // Act
      const result = () => config.load('test')

      // Assert
      await expect(result).rejects.toThrowError(/Cannot find module .*test\.config\.js/)
    })

    test('should fail to load invalid config schema', async () => {
      // Arrange
      const path = resolve('fixtures/invalid-schema-config')
      const config = new Config(path)

      // Act
      const result = () => config.load('test')

      // Assert
      await expect(result).rejects.toMatchInlineSnapshot(`[ConfigException: invalid config.schema.js file]`)
    })

    test('should fail to load invalid default config', async () => {
      // Arrange
      const path = resolve('fixtures/invalid-default-config')
      const config = new Config(path)

      // Act
      const result = () => config.load('test')

      // Assert
      await expect(result).rejects.toMatchInlineSnapshot(`[ConfigException: invalid default.config.js file]`)
    })

    test('should fail to load invalid env config', async () => {
      // Arrange
      const path = resolve('fixtures/invalid-env-config')
      const config = new Config(path)

      // Act
      const result = () => config.load('test')

      // Assert
      await expect(result).rejects.toMatchInlineSnapshot(`[ConfigException: invalid test.config.js file]`)
    })

    test('should fail to load invalid final config', async () => {
      // Arrange
      const path = resolve('fixtures/invalid-config')
      const config = new Config(path)

      // Act
      const result = () => config.load('test')

      // Assert
      await expect(result).rejects.toMatchInlineSnapshot(`
        [ZodError: [
          {
            "code": "invalid_value",
            "values": [
              "bar"
            ],
            "path": [
              "foo"
            ],
            "message": "Invalid input: expected \\"bar\\""
          }
        ]]
      `)
    })

    test('should load config', async () => {
      // Arrange
      const path = resolve('fixtures/valid-config')
      const config = new Config(path)

      // Act
      const result = () => config.load('test')

      // Assert
      await expect(result).not.toThrow()
    })
  })
  describe('get', () => {
    test('should get a key from config', async () => {
      // Arrange
      const path = resolve('fixtures/valid-config')
      const config = new Config<ConfigMap>(path)

      // Act
      await config.load('test')
      const val = config.get('foo')

      // Assert
      expect(val).toEqual('bar')
    })

    test('should return undefined for a missing key in config', async () => {
      // Arrange
      const path = resolve('fixtures/valid-config')
      const config = new Config(path)

      // Act
      await config.load('test')
      const val = config.get('fooooo') // <- missing key

      // Assert
      expect(val).toEqual(undefined)
    })

    test('should throw when load not called first', () => {
      // Arrange
      const path = resolve('fixtures/valid-config')
      const config = new Config(path)

      // Act
      const val = () => config.get('foo')

      // Assert
      expect(val).toThrowErrorMatchingInlineSnapshot(`[ConfigException: The config should be loaded first with config.load()]`)
    })
  })
})
