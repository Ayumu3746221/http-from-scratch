export class AppError extends Error {
  constructor(message: string) {
    super(message);
  }
}

export class InvalidRequestError extends AppError {
  constructor(expect: string, content: string) {
    super(`Invalid Request Error: Should be ${expect}, You request ${content}\n`);
  }
}

export class NotFoundError extends AppError {
  constructor(expect: string) {
    super(`Not Found: ${expect}'s resource in this application\n`);
  }
}
