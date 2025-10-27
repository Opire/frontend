import { PricePrimitive } from '../_primitives/PricePrimitive';
import { PositiveNumber } from './PositiveNumber';
import { PriceUnit } from './PriceUnit';

export class Price {
  constructor(
    private _value: PositiveNumber,
    private _unit: PriceUnit
  ) {
    const valueAsCents = Math.round(_value.value * PriceUnit.ConversionRateToUsdCents[_unit.value]);
    this._value = new PositiveNumber(valueAsCents);
    this._unit = PriceUnit.USD_CENT;
  }

  get value(): PositiveNumber {
    return this._value;
  }

  public valueAs(priceUnit: PriceUnit): number {
    const result = this._value.value / PriceUnit.ConversionRateToUsdCents[priceUnit.value];

    if (priceUnit.equals(PriceUnit.USD)) {
      return Math.round((result + Number.EPSILON) * 100) / 100;
    }

    return Math.round(result);
  }

  public valueAsCents(): number {
    return this._value.value;
  }

  get unit(): PriceUnit {
    return this._unit;
  }

  public equals(price: Price): boolean {
    return this.value.value === price.value.value;
  }

  public isGreaterThan(price: Price): boolean {
    return this.value.value > price.value.value;
  }

  public isEqualOrGreaterThan(price: Price): boolean {
    return this.equals(price) || this.isGreaterThan(price);
  }

  public isLowerThan(price: Price): boolean {
    return this.value.value < price.value.value;
  }

  public isEqualOrLowerThan(price: Price): boolean {
    return this.equals(price) || this.isLowerThan(price);
  }

  public isBetween(lowerPrice: Price, upperPrice: Price): boolean {
    return this.isEqualOrGreaterThan(lowerPrice) && this.isEqualOrLowerThan(upperPrice);
  }

  public static sum(prices: Price[]): Price {
    const pricesInUsdCent = prices.map(price => price.valueAs(PriceUnit.USD_CENT));
    const totalPricesInUsdCent = pricesInUsdCent.reduce((acc, number) => acc + number, 0);

    return new Price(new PositiveNumber(totalPricesInUsdCent), PriceUnit.USD_CENT);
  }

  public multiplyBy(number: PositiveNumber): Price {
    return new Price(
      new PositiveNumber(this.valueAs(PriceUnit.USD_CENT) * number.value),
      PriceUnit.USD_CENT
    );
  }

  public divideBy(number: PositiveNumber): Price {
    if (number.value === 0) {
      throw new Error('Cannot divide by 0');
    }

    return new Price(
      new PositiveNumber(this.valueAs(PriceUnit.USD_CENT) / number.value),
      PriceUnit.USD_CENT
    );
  }

  public minus(price: Price): Price {
    return new Price(
      new PositiveNumber(this.valueAs(PriceUnit.USD_CENT) - price.valueAs(PriceUnit.USD_CENT)),
      PriceUnit.USD_CENT
    );
  }

  public getValuePercentage(percentage: PositiveNumber): Price {
    const total = this.value.value * (percentage.value / 100);

    return new Price(new PositiveNumber(total), this.unit);
  }

  static zero(): Price {
    return new Price(new PositiveNumber(0), PriceUnit.USD);
  }

  static fromPrimitives(dto: PricePrimitive): Price {
    return new Price(new PositiveNumber(dto.value), new PriceUnit(dto.unit));
  }

  public toPrimitives(): PricePrimitive {
    return {
      unit: PriceUnit.USD_CENT.value,
      value: this.valueAsCents(),
    };
  }
}
