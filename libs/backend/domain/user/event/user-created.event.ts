import { DomainEvent } from '@calm-mail/shared-domain';

export class UserCreatedEvent extends DomainEvent {
    constructor(
        private readonly userId: string,
        private readonly email: string,
    ) {
        super();
    }

    get aggregateId(): string {
        return this.userId;
    }

    get userEmail(): string {
        return this.email;
    }
}
