export abstract class Entity<T> {
    protected constructor(protected readonly _id: T) {}

    get id(): T {
        return this._id;
    }

    equals(entity: Entity<T>): boolean {
        if (entity === null || entity === undefined) {
            return false;
        }
        return this._id === entity._id;
    }
}
