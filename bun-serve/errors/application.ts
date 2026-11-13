export class AppError extends Error {
  constructor(message: string) {
    super(message);
  }
}

export class InvalidRequestError extends AppError {
  constructor(expect: string, content: string) {
    super(`Invalid Request Error: Should be ${expect}, You request ${content}`);
  }
}
