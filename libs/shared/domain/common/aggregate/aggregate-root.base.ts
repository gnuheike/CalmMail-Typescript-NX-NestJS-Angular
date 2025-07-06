import { Entity } from '../entity/entity.base';
import { DomainEvent } from '../event/domain-event';

export abstract class AggregateRoot<T> extends Entity<T> {
    private _domainEvents: DomainEvent[] = [];

    get domainEvents(): DomainEvent[] {
        return this._domainEvents;
    }

    clearEvents(): void {
        this._domainEvents = [];
    }

    protected addDomainEvent(event: DomainEvent): void {
        this._domainEvents.push(event);
    }
}
