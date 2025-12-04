import { defineConfig, type ViteUserConfig } from 'vitest/config'

const config = defineConfig({
  test: {
    environment: 'node',
    vmMemoryLimit: '256MB',
    sequence: {
      concurrent: true, // run tests within test file concurrently
      shuffle: true // shuffle test execution order on each run
    },
    include: ['**/*.test.ts', '**/*.test-d.ts'],
    coverage: {
      enabled: true,
      provider: 'v8',
      reporter: ['text-summary', 'html'],
      thresholds: {
        functions: 100,
        lines: 100,
        branches: 100,
        statements: 100,
      },
      include: ['src/'],
      exclude: [
        'src/app/exception.ts',
        'src/config/development.ts',
        'src/config/production.ts',
        'src/config/test.ts',
        'src/index.ts',
        'src/schema.ts',
      ]
    },
    typecheck: {
      enabled: true,
      include: ['**/*.test.ts', '**/*.test-d.ts'],
    },
    setupFiles: [
      'vitest.setup.ts',
    ],
  }
}) satisfies ViteUserConfig

export default config
