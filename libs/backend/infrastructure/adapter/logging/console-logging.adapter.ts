// libs/backend/infrastructure/logging/adapters/console-logging.adapter.ts
import { ConsoleLogger, Injectable } from '@nestjs/common';
import { LogEntry, LoggerPort } from '../../logging/port/logger.port';

@Injectable()
export class ConsoleLoggingAdapter implements LoggerPort {
    private readonly consoleLogger = new ConsoleLogger();

    log(entry: LogEntry): void {
        this.consoleLogger.log(this.formatMessage(entry), entry.context);
    }

    error(entry: LogEntry): void {
        this.consoleLogger.error(this.formatMessage(entry), entry.error?.stack, entry.context);
    }

    warn(entry: LogEntry): void {
        this.consoleLogger.warn(this.formatMessage(entry), entry.context);
    }

    debug(entry: LogEntry): void {
        this.consoleLogger.debug(this.formatMessage(entry), entry.context);
    }

    verbose(entry: LogEntry): void {
        this.consoleLogger.verbose(this.formatMessage(entry), entry.context);
    }

    private formatMessage(entry: LogEntry): string {
        const parts = [entry.message];

        if (entry.logContext?.correlationId) {
            parts.push(`[${entry.logContext.correlationId}]`);
        }

        if (entry.logContext?.userId) {
            parts.push(`[User: ${entry.logContext.userId}]`);
        }

        if (entry.logContext?.operation) {
            parts.push(`[Op: ${entry.logContext.operation}]`);
        }

        if (entry.logContext?.metadata) {
            const metadataStr = JSON.stringify(entry.logContext.metadata);
            if (metadataStr !== '{}') {
                parts.push(`[Meta: ${metadataStr}]`);
            }
        }

        return parts.join(' ');
    }
}
