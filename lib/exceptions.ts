export class UnauthorizedError extends Error {
  constructor(
    message = 'You are not authorized to perform this action.',
  ) {
    super(message)
    this.name = 'UnauthorizedError'
  }
}

export class NotFoundError extends Error {
  constructor(message = 'The requested resource was not found.') {
    super(message)
    this.name = 'NotFoundError'
  }
}
