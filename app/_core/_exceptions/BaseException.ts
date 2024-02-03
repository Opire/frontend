export abstract class BaseException extends Error {

    constructor(protected _message: string, protected _data?: Record<string, unknown>) {
        super();
        Object.setPrototypeOf(this, BaseException.prototype); // https://github.com/Microsoft/TypeScript/wiki/Breaking-Changes#extending-built-ins-like-error-array-and-map-may-no-longer-work
    }

    get message(): string {
        return this._message;
    }

    get data(): Record<string, unknown> | undefined {
        return this._data;
    }

}
