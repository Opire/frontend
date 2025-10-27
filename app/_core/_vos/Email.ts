import { InvalidEmail } from '../_exceptions/InvalidEmail';

export class Email {
  private _value: string;

  constructor(email: string) {
    if (!this.isValidEmail(email)) {
      throw new InvalidEmail(email);
    }

    this._value = email;
  }

  public get value(): string {
    return this._value;
  }

  public equals(email: Email): boolean {
    return this.value === email.value;
  }

  private isValidEmail(email: string): boolean {
    const haveSpace = email.includes(' ');

    const haveAtSign = email.includes('@');
    const atSignIsNotLastCharacter = email.indexOf('@') < email.length - 1;

    const [userName, domain] = email.split('@');
    const haveUserNameAndDomain = !!userName && !!domain;

    let haveCorrectDomain = false;
    if (haveUserNameAndDomain) {
      const [domainName, domainType] = domain.split('.');
      haveCorrectDomain = !!domainName && !!domainType;
    }

    return (
      haveAtSign &&
      atSignIsNotLastCharacter &&
      haveUserNameAndDomain &&
      haveCorrectDomain &&
      !haveSpace
    );
  }
}
