import { InvalidPriceUnit } from '../_exceptions/InvalidPriceUnit';
import { EnumValueObject } from './EnumValueObject';

export type PriceUnitType = 'USD' | 'USD_CENT';

export class PriceUnit extends EnumValueObject<PriceUnitType> {
  public static readonly ValidValues: PriceUnitType[] = ['USD', 'USD_CENT'];

  public static readonly ConversionRateToUsdCents: Record<PriceUnitType, number> = {
    USD: 100,
    USD_CENT: 1,
  };

  constructor(value: PriceUnitType) {
    super(value, PriceUnit.ValidValues);
  }

  protected throwErrorForInvalidValue(value: PriceUnitType): void {
    throw new InvalidPriceUnit(value);
  }

  get isUSD(): boolean {
    return this.value === 'USD';
  }

  get isUSD_CENT(): boolean {
    return this.value === 'USD_CENT';
  }

  static get USD(): PriceUnit {
    return new PriceUnit('USD');
  }

  static get USD_CENT(): PriceUnit {
    return new PriceUnit('USD_CENT');
  }
}
