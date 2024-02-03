export abstract class EnumValueObject<T> {

    readonly value: T;

    constructor(value: T, public readonly validValues: T[]) {
        this.value = value;
        this.checkValueIsValid(value);
    }

    public checkValueIsValid(value: T): void {
        if (!this.validValues.includes(value)) {
            this.throwErrorForInvalidValue(value);
        }
    }

    protected abstract throwErrorForInvalidValue(value: T): void;

    public equals(value: EnumValueObject<T>): boolean {
        return this.value === value.value;
    }

}
