export default class AppError extends Error {
  public readonly name: string;
  public readonly httpCode: number;

  constructor(message: string, httpCode: number) {
    super(message);

    Object.setPrototypeOf(this, new.target.prototype);

    this.name = "AppError";
    this.httpCode = httpCode;

    Error.captureStackTrace(this);
  }
}
