//// filepath: c:\Users\dioney\Documents\projeto\pdv\novo backend\src\errors\AppError.ts
export class AppError extends Error {
    public readonly statusCode: number;
  
    constructor(message: string, statusCode = 500) {
      super(message);
      this.statusCode = statusCode;
      Object.setPrototypeOf(this, new.target.prototype);
    }
  }
  
  export class NotFoundError extends AppError {
    constructor(message: string) {
      super(message, 404);
    }
  }
  
  export class BadRequestError extends AppError {
    constructor(message: string) {
      super(message, 400);
    }
  }
  
  // Você pode criar outras classes específicas (UnauthorizedError, etc.)

  export class UnauthorizedError extends AppError {
    constructor(message: string) {
      super(message, 401);
    }
  }

  export class ForbiddenError extends AppError {
    constructor(message: string) {
      super(message, 403);
    }
  }

  export class InternalServerError extends AppError {
    constructor(message: string) {
      super(message, 500);
    }
  }

  export class ConflictError extends AppError {
    constructor(message: string) {
      super(message, 409);
    }
  }

  export class UnprocessableEntityError extends AppError {
    constructor(message: string) {
      super(message, 422);
    }
  }

  export class NotImplementedError extends AppError {
    constructor(message: string) {
      super(message, 501);
    }
  }

  export class ServiceUnavailableError extends AppError {
    constructor(message: string) {
      super(message, 503);
    }
  }

  export class GatewayTimeoutError extends AppError {
    constructor(message: string) {
      super(message, 504);
    }
  }

  export class TooManyRequestsError extends AppError {
    constructor(message: string) {
      super(message, 429);
    }
  }

  export class NotAcceptableError extends AppError {
    constructor(message: string) {
      super(message, 406);
    }
  }