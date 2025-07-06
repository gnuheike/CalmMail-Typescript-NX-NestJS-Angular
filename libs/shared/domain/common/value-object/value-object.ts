export abstract class ValueObject<T> {
    protected abstract _type: void;

    constructor(protected readonly value: T) {}

    getValue(): T {
        return this.value;
    }

    equals(valueObject: ValueObject<T>): boolean {
        return this.getValue() === valueObject.getValue();
    }

    notEquals(valueObject: ValueObject<T>): boolean {
        return !this.equals(valueObject);
    }

    equalsValue(value: T): boolean {
        return this.value === value;
    }

    toString(): string {
        return String(this.value);
    }
}
