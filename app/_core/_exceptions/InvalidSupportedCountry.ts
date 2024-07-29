import { SupportedCountry } from "../_vos/SupportedCountry";
import { BaseException } from "./BaseException";

export class InvalidSupportedCountry extends BaseException {

    constructor(country: string) {
        super(
            `The supported country "${country}" is invalid`,
            {
                country,
                validCountries: SupportedCountry.ValidValues,
            },
        );
        Object.setPrototypeOf(this, InvalidSupportedCountry.prototype); // https://github.com/Microsoft/TypeScript/wiki/Breaking-Changes#extending-built-ins-like-error-array-and-map-may-no-longer-work
    }

}
