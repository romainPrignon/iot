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
      provider: 'v8',
      include: ['src/'],
      reporter: ['text-summary', 'html'],
      thresholds: {
        functions: 100,
        lines: 100,
        branches: 100,
        statements: 100,
      }
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
