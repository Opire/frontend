import { BaseException } from './BaseException';

export class InvalidEmail extends BaseException {

    constructor(email: string) {
        super(
            `Email "${email}" is invalid`,
            {
                email,
            },
        );
        Object.setPrototypeOf(this, InvalidEmail.prototype); // https://github.com/Microsoft/TypeScript/wiki/Breaking-Changes#extending-built-ins-like-error-array-and-map-may-no-longer-work
    }

}
