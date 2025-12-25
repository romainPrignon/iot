export type ExceptionContext = { context?: Record<string, unknown> }
export type ExceptionOptions = ErrorOptions & ExceptionContext

export class Exception extends Error {

  context?: Record<string, unknown>

  constructor(message?: string, options?: ExceptionOptions) {
    super(message, options)
    this.name = this.constructor.name
    this.context = options?.context
  }
}

export class ConfigException extends Exception { }
