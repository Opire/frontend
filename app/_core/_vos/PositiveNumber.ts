import { PositiveNumberMustBeGreaterThan0 } from '../_exceptions/PositiveNumberMustBeGreaterThan0';
import { ValueObject } from './ValueObject';

export class PositiveNumber extends ValueObject<number> {
  constructor(_value: number) {
    super(_value);
    this.ensureIsPositive(_value);
  }

  private ensureIsPositive(value: number) {
    const numValue = +value;

    if (Number.isNaN(+numValue) || numValue < 0) {
      throw new PositiveNumberMustBeGreaterThan0(numValue);
    }
  }

  protected throwErrorForInvalidValue(value: number): void {
    throw new PositiveNumberMustBeGreaterThan0(value);
  }
}
