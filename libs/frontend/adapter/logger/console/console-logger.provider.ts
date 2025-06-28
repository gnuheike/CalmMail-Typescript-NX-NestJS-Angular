import { Provider } from '@angular/core';
import { ConsoleLoggerAdapter } from './console-logger.adapter';
import { LoggerPort } from '@calm-mail/frontend-shared';

export function consoleLoggerProvider(): Provider[] {
    return [
        {
            provide: LoggerPort,
            useClass: ConsoleLoggerAdapter,
        },
    ];
}
