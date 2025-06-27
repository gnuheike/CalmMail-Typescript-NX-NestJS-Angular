import { Provider } from '@angular/core';
import { InMemoryEmailRepositoryAdapter } from './in-memory-email.repository.service';
import { EmailRepositoryPort } from '@calm-mail/frontend-domain';

export function inMemoryEmailRepositoryProvider(): Provider[] {
    return [
        {
            provide: EmailRepositoryPort,
            useClass: InMemoryEmailRepositoryAdapter,
        },
    ];
}
