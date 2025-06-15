import { Provider } from '@angular/core';
import { EmailGateway } from '@calm-mail/frontend-application';
import { InMemoryEmailGateway } from '../adapter';

export function inMemoryEmailGatewayProviders(): Provider[] {
    return [
        {
            provide: EmailGateway,
            useClass: InMemoryEmailGateway,
        },
    ];
}
