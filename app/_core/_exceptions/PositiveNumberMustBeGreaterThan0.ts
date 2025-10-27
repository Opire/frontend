import { BaseException } from './BaseException';

export class PositiveNumberMustBeGreaterThan0 extends BaseException {
  constructor(number: number) {
    super(`Number "${number}" must be greater than 0`, {
      number,
    });
    Object.setPrototypeOf(this, PositiveNumberMustBeGreaterThan0.prototype); // https://github.com/Microsoft/TypeScript/wiki/Breaking-Changes#extending-built-ins-like-error-array-and-map-may-no-longer-work
  }
}
