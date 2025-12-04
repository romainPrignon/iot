import type { ConfigMap } from "./config.schema.js"

export default () => ({
  METRICS_ENABLED: false,
} satisfies Prettify<Partial<ConfigMap>>)
