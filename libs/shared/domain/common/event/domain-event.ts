export abstract class DomainEvent {
    public readonly occurredOn: Date;

    protected constructor() {
        this.occurredOn = new Date();
    }

    abstract get aggregateId(): string;
}
