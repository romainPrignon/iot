# 3. write-protocol

Date: 2025-11-16

## Status

Accepted

## Context

Should writes use standard MQTT or something else ?

## Decision

Use an HTTP API instead of MQTT for writes.

## Consequences

- better control over the logic
- easier security implementation
- more flexible
- protocol agnostic
- symetrie with the read part

- less standard
- more work
