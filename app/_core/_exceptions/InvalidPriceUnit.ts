import { PriceUnit } from "../_vos/PriceUnit";
import { BaseException } from "./BaseException";

export class InvalidPriceUnit extends BaseException {

    constructor (priceUnit: string) {
        super(
            `Price unit "${priceUnit}" is invalid`,
            {
                priceUnit,
                validValues: PriceUnit.ValidValues,
            },
        );
        Object.setPrototypeOf(this, InvalidPriceUnit.prototype); // https://github.com/Microsoft/TypeScript/wiki/Breaking-Changes#extending-built-ins-like-error-array-and-map-may-no-longer-work
    }

}
