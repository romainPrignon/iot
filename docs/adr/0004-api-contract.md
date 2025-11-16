# 4. api-contract

Date: 2025-11-16

## Status

Accepted

## Context

The contract between API calls should be normalized

## Decision

Here is the contract:
```json
{
  "data": {
    // ...
  },
  "meta": {
    // ...
  },
  "error": {
    "code": "SOME_ERR_CODE",
    "message": "error message",
    "cause": {
      "code": "SOME_ERR_CODE_CAUSE",
      "message": "cause error message",
    }
  }
}
```

- MUST have a data property
- MAY have a meta property
- MAY have an error property in case of server error
  - in case of error, data property is null
  - error MUST have a code property
  - error MUST have a message property
  - error MAY have a cause property that represent an error (recursive)
  - error MAY have a context property that represent error relative data

### case of AggregateError

```json
{
  "data": null,
  "error": {
    "code": "AggregateError",
    "message": "Several errors occured",
    "context": {
      "errors": [
        {
          "code": "SOME_ERR_CODE",
          "message": "error message",
        }
      ]
    }
  }
}
```

## Consequences

All calls must adhere to this interface.  
See [JSON Schema](../assets/api-contract.json)
