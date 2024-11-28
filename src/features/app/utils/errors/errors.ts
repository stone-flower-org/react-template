export interface ErrorParams {
  cause?: Error;
}

export class BaseError extends Error {
  public static setType(errorInstance: any, constructor: any) {
    const actualProto = constructor.prototype;
    if (Object.setPrototypeOf) Object.setPrototypeOf(errorInstance, actualProto);
    else errorInstance.__proto__ = actualProto;
  }

  constructor(message?: string, params: ErrorParams = {}) {
    super(message, params);
    this.name = new.target.name;
    BaseError.setType(this, new.target);
  }
}
