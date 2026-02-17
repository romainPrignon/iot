import type { ConfigMap } from "./config.schema.js"

export default (): Partial<ConfigMap> => ({
  METRICS_ENABLED: false,
})
