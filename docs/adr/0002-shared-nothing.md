# 2. shared-nothing

Date: 2025-11-16

## Status

Accepted

## Context

Nothing should be shared between the write part and the read part

## Decision

- 2 load balancer
- minimize code share between write and read api
- 1 database

## Consequences

- easier to scale independent parts
