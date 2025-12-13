export class Exception extends Error {
  constructor(message?: string, options?: ErrorOptions) {
    super(message, options)
    this.name = this.constructor.name
  }
}

export class ConfigException extends Exception { }
