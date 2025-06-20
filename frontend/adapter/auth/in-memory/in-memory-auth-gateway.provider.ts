import { Provider } from '@angular/core';
import { AuthGateway } from '@calm-mail/frontend/core-ports';
import { InMemoryAuthGateway } from './in-memory-auth-gateway.service';

export function inMemoryAuthGatewayProvider(): Provider[] {
    return [
        {
            provide: AuthGateway,
            useClass: InMemoryAuthGateway,
        },
    ];
}
