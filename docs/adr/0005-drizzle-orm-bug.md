# 5. drizzle-orm-bug

Date: 2025-11-23

## Status

Accepted

## Context

There is a bug using drizzle in a pnpm workspace https://github.com/drizzle-team/drizzle-orm/issues/2699

## Decision

Add `drizzle-orm` and `pg` as a top Dependencies in the root `package.json`

## Consequences

the drizzle dependency that should reside in data/ is now a root dependency
