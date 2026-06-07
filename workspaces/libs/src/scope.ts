import { AsyncLocalStorage } from 'node:async_hooks'

type Store = Record<string, unknown>

// 🔴 Exporting `asyncLocalStorage` breaks the encapsulation guarantees of `reference`.
// Any consumer can `asyncLocalStorage.getStore()[key] = ...` and bypass the immutability
// check in `reference.set()`. Keep this module-private and expose only `run` + a thin
// internal accessor for `reference.ts` (e.g. via a non-exported symbol or a getter).
export const asyncLocalStorage: AsyncLocalStorage<Store> = new AsyncLocalStorage<Store>()

// 🔴 Nested `run()` reuses the parent store by reference instead of creating a child scope.
// Combined with `reference.set()`'s "immutable" guard, calling `run()` inside another `run()`
// makes any previously-set reference throw on re-set, and mutations leak back into the parent
// scope. Either clone the parent store (`{ ...store }`) to get copy-on-write semantics, or
// document this as intentional inheritance and adjust the immutability contract accordingly.
export const run = <R>(cb: () => R): R => {
  const store = asyncLocalStorage.getStore()

  return asyncLocalStorage.run<R, []>(store || {}, cb)
}
