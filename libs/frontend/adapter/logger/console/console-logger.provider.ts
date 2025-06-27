import { Provider } from '@angular/core';
import { ConsoleLoggerAdapter } from './console-logger.adapter';
import { LoggerPort } from '@calm-mail/frontend-domain';

export function consoleLoggerProvider(): Provider[] {
    return [
        {
            provide: LoggerPort,
            useClass: ConsoleLoggerAdapter,
        },
    ];
}
