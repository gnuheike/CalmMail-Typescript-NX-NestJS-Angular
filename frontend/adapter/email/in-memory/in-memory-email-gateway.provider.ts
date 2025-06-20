import { Provider } from '@angular/core';
import { EmailGateway } from '@calm-mail/frontend/core-ports';
import { InMemoryEmailGateway } from './in-memory-email-gateway.service';

export function inMemoryEmailGatewayProvider(): Provider[] {
    return [
        {
            provide: EmailGateway,
            useClass: InMemoryEmailGateway,
        },
    ];
}
