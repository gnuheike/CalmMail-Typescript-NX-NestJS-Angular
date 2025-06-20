import { LoggerPort, LogMessage } from '@calm-mail/frontend-core-ports';

export class ConsoleLoggerService extends LoggerPort {
    error(message: string, error: unknown): Promise<void> {
        console.error(message, error);
        return Promise.resolve();
    }

    info(message: string): Promise<void> {
        console.log(message);
        return Promise.resolve();
    }

    log(message: LogMessage): Promise<void> {
        console.log(message);
        return Promise.resolve();
    }

    warn(message: string): Promise<void> {
        console.warn(message);
        return Promise.resolve();
    }
}
