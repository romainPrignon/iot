import type { ConfigMap } from "./config.schema.js"

export default () => ({
  METRICS_ENABLED: true,
} satisfies Prettify<Partial<ConfigMap>>)
