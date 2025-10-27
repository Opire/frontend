import { Mutable } from '../../_utils/mutable';
import { InvalidSupportedCountry } from '../_exceptions/InvalidSupportedCountry';
import { EnumValueObject } from './EnumValueObject';

export type SupportedCountryType = (typeof SupportedCountry.ValidValues)[number];

export class SupportedCountry extends EnumValueObject<SupportedCountryType> {
  protected static readonly OPTIONS = [
    'AL',
    'AG',
    'AR',
    'AM',
    'AU',
    'AT',
    'BS',
    'BH',
    'BE',
    'BJ',
    'BO',
    'BA',
    'BW',
    'BN',
    'BG',
    'KH',
    'CA',
    'CL',
    'CO',
    'CR',
    'HR',
    'CY',
    'CZ',
    'CI',
    'DK',
    'DO',
    'EC',
    'EG',
    'SV',
    'EE',
    'ET',
    'FI',
    'FR',
    'GM',
    'DE',
    'GH',
    'GI',
    'GR',
    'GT',
    'GY',
    'HK',
    'HU',
    'IS',
    'IN',
    'ID',
    'IE',
    'IL',
    'IT',
    'JM',
    'JP',
    'JO',
    'KE',
    'KW',
    'LV',
    'LI',
    'LT',
    'LU',
    'MO',
    'MG',
    'MY',
    'MT',
    'MU',
    'MX',
    'MD',
    'MC',
    'MN',
    'MA',
    'NA',
    'NL',
    'NZ',
    'NG',
    'MK',
    'NO',
    'OM',
    'PK',
    'PA',
    'PY',
    'PE',
    'PH',
    'PL',
    'PT',
    'QA',
    'RO',
    'RW',
    'SA',
    'SN',
    'RS',
    'SG',
    'SK',
    'SI',
    'ZA',
    'KR',
    'ES',
    'LK',
    'LC',
    'SE',
    'CH',
    'TW',
    'TZ',
    'TH',
    'TT',
    'TN',
    'TR',
    'AE',
    'GB',
    'US',
    'UY',
    'UZ',
    'VN',

    // Newly supported countries
    'DZ',
    'AO',
    'AZ',
    'BD',
    'BT',
    'GA',
    'KZ',
    'LA',
    'MZ',
    'NE',
    'SM',
  ] as const;

  public static readonly ValidValues = SupportedCountry.OPTIONS as Mutable<
    typeof SupportedCountry.OPTIONS
  >;

  constructor(_value: SupportedCountryType) {
    super(_value, SupportedCountry.ValidValues);
  }

  static isValid(value: SupportedCountryType): boolean {
    return SupportedCountry.ValidValues.includes(value);
  }

  protected throwErrorForInvalidValue(value: SupportedCountryType): void {
    throw new InvalidSupportedCountry(value);
  }

  static get EEUU(): SupportedCountry {
    return new SupportedCountry('US');
  }

  static fromString(possibleCountry: string): SupportedCountry {
    // Will throw an error if not a valid country
    return new SupportedCountry(possibleCountry as SupportedCountryType);
  }
}
