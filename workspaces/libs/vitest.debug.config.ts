import { defineConfig, type ViteUserConfig } from 'vitest/config'
import viteConfig from './vite.config.js'

const config: ViteUserConfig = defineConfig({
  ...viteConfig,
  test: {
    ...viteConfig.test,
    inspect: true,
    fileParallelism: false,
    sequence: {
      concurrent: false,
      shuffle: false
    },
  }
})

export default config
