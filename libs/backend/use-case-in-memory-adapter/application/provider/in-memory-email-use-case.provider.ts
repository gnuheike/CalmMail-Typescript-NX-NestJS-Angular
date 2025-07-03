import { Provider } from '@nestjs/common';
import { GetEmailsUseCase } from '@calm-mail/backend-domain';
import { InMemoryGetEmailsUseCase } from '../../infrastructure/email';

/**
 * Provides in-memory implementations of backend use cases
 *
 * This function returns an array of NestJS providers that map
 * the abstract use case classes to their in-memory implementations.
 *
 * @returns Array of NestJS providers
 */
export function inMemoryEmailUseCaseProviders(): Provider[] {
    return [
        {
            provide: GetEmailsUseCase,
            useClass: InMemoryGetEmailsUseCase,
        },
    ];
}
