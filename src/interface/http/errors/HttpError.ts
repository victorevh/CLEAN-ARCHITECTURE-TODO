/**
 * A standard HTTP error for controller-layer exception handling.
 */
export class HttpError extends Error {
  public readonly statusCode: number;

  constructor(statusCode: number, message: string) {
    super(message);
    this.statusCode = statusCode;
    this.name = "HttpError";
  }

  /**
   * Converts the error to a plain object for JSON responses.
   */
  public toObject() {
    return {
      status: this.statusCode,
      message: this.message,
    };
  }

  // === Factory methods for common HTTP errors ===

  static badRequest(message = "Bad request") {
    return new HttpError(400, message);
  }

  static unauthorized(message = "Unauthorized") {
    return new HttpError(401, message);
  }

  static forbidden(message = "Forbidden") {
    return new HttpError(403, message);
  }

  static notFound(message = "Not found") {
    return new HttpError(404, message);
  }

  static timeout(message = "Request timeout") {
    return new HttpError(408, message);
  }

  static conflict(message = "Conflict") {
    return new HttpError(409, message);
  }

  static internal(message = "Internal server error") {
    return new HttpError(500, message);
  }

  /**
   * Parses an unknown error and returns a safe HttpError.
   */
  static parse(error: unknown): HttpError {
    if (error instanceof HttpError) {
      return error;
    }

    if (error instanceof Error) {
      return HttpError.badRequest(error.message);
    }

    return HttpError.internal();
  }
}
