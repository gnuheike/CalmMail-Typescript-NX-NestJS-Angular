import { Provider } from '@angular/core';
import { InMemoryAuthRepositoryAdapter } from './in-memory-auth.repository.service';
import { AuthPersistencePort, AuthRepositoryPort, AuthStatePort } from '@calm-mail/frontend-domain';
import { InMemoryAuthStateAdapter } from './in-memory-auth.state.service';
import { InMemoryAuthPersistentAdapter } from './in-memory-auth-persistent-port-adapter.service';

export function inMemoryAuthProvider(): Provider[] {
    return [
        {
            provide: AuthRepositoryPort,
            useClass: InMemoryAuthRepositoryAdapter,
        },
        {
            provide: AuthStatePort,
            useClass: InMemoryAuthStateAdapter,
        },
        {
            provide: AuthPersistencePort,
            useClass: InMemoryAuthPersistentAdapter,
        },
    ];
}
