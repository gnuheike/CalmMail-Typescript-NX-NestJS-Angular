import { Provider } from '@angular/core';
import { LoggerPort } from '@calm-mail/frontend-core-ports';
import { ConsoleLoggerService } from './console-logger.service';

export function consoleLoggerProvider(): Provider[] {
    return [
        {
            provide: LoggerPort,
            useClass: ConsoleLoggerService,
        },
    ];
}
