import { asyncLocalStorage } from './scope.js'

export type Reference<T> = {
  name: string
  get(): T
  set(val: T): void
  has(): boolean
}

const MESSAGE_ERROR_SCOPE = 'must be called within a scope. make sure to call scope.run() first'

// 🔴 No collision detection across `reference()` calls. Two independent modules calling
// `reference('drizzle')` will silently share the same slot in the store, and the second
// `set()` will throw the "already set" error from a seemingly unrelated call site. Either
// keep a module-level registry of registered keys (throw on duplicate `reference(key)`),
// or key the store by a `Symbol(key)` owned by each `Reference` instance so the string
// name is only used for diagnostics.
export const reference = <T>(key: string): Reference<T> => ({
  name: key,
  get(): T {
    const store = asyncLocalStorage.getStore()

    if (!store) throw new Error(`get() ${MESSAGE_ERROR_SCOPE}`)
    if (!(key in store)) throw new Error(`missing key "${key}" in scope. make sure to call ref.set() first`)

    return store[key] as T
  },
  set(val: T): void {
    const store = asyncLocalStorage.getStore()

    if (!store) throw new Error(`set() ${MESSAGE_ERROR_SCOPE}`)
    if (key in store)
      throw new Error(`reference "${key}" already set. References are immutable and cannot be overridden`)

    store[key] = val
  },
  has(): boolean {
    const store = asyncLocalStorage.getStore()

    if (!store) throw new Error(`has() ${MESSAGE_ERROR_SCOPE}`)

    return key in store
  }
})
