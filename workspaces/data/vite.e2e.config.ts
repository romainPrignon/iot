import { defineConfig } from "vitest/config"

export default defineConfig({
  test: {
    environment: 'node',
    vmMemoryLimit: '256MB',
    // pool: 'threads',
    // fileParallelism: false,
    sequence: {
      concurrent: true, // run tests within test file concurrently
      shuffle: true // shuffle test execution order on each run
    },
    include: ['**/*.e2e.ts'],
    // coverage: {
    //   include: ['src/resolvers/**/*.resolver.ts']
    // },
    typecheck: {
      enabled: true,
      include: ['**/*.e2e.ts'],
    },
    globalSetup: [
      'vitest.e2e.global.ts',
    ],
    setupFiles: [
      'vitest.e2e.setup.ts',
    ],
  }
})
