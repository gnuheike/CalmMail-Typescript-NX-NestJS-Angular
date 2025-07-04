import { Injectable, LoggerService } from '@nestjs/common';
import { LogContext, LogEntry, LoggerPort, LogLevel } from '../port/logger.port';

@Injectable()
export class AppLogger implements LoggerService {
    constructor(private readonly adapter: LoggerPort) {}

    log(message: string, context?: string, logContext?: LogContext) {
        const entry = this.createLogEntry('log', message, context, logContext);
        this.adapter.log(entry);
    }

    error(message: string, trace?: string, context?: string, logContext?: LogContext) {
        const entry = this.createLogEntry('error', message, context, logContext);
        if (trace) {
            entry.error = {
                name: 'Error',
                message,
                stack: trace,
            };
        }
        this.adapter.error(entry);
    }

    warn(message: string, context?: string, logContext?: LogContext) {
        const entry = this.createLogEntry('warn', message, context, logContext);
        this.adapter.warn(entry);
    }

    debug(message: string, context?: string, logContext?: LogContext) {
        const entry = this.createLogEntry('debug', message, context, logContext);
        this.adapter.debug(entry);
    }

    verbose(message: string, context?: string, logContext?: LogContext) {
        const entry = this.createLogEntry('verbose', message, context, logContext);
        this.adapter.verbose(entry);
    }

    // Domain-specific logging methods
    logBusinessEvent(event: string, data: any, logContext?: LogContext) {
        const entry = this.createLogEntry('log', `Business Event: ${event}`, 'BusinessEvent', {
            ...logContext,
            metadata: {
                ...logContext?.metadata,
                eventType: 'business',
                event,
                data,
            },
        });
        this.adapter.log(entry);
    }

    logSecurityEvent(event: string, data: any, logContext?: LogContext) {
        const entry = this.createLogEntry('warn', `Security Event: ${event}`, 'SecurityEvent', {
            ...logContext,
            metadata: {
                ...logContext?.metadata,
                eventType: 'security',
                event,
                data,
            },
        });
        this.adapter.warn(entry);
    }

    logPerformance(operation: string, duration: number, logContext?: LogContext) {
        const entry = this.createLogEntry('log', `Performance: ${operation} took ${duration}ms`, 'Performance', {
            ...logContext,
            metadata: {
                ...logContext?.metadata,
                eventType: 'performance',
                operation,
                duration,
            },
        });
        this.adapter.log(entry);
    }

    logAIProcessing(event: string, data: any, logContext?: LogContext) {
        const entry = this.createLogEntry('log', `AI Processing: ${event}`, 'AIProcessing', {
            ...logContext,
            metadata: {
                ...logContext?.metadata,
                eventType: 'ai_processing',
                event,
                data,
            },
        });
        this.adapter.log(entry);
    }

    logCronJob(jobName: string, status: 'started' | 'completed' | 'failed', logContext?: LogContext) {
        const level = status === 'failed' ? 'error' : 'log';
        const entry = this.createLogEntry(level, `Cron Job: ${jobName} ${status}`, 'CronJob', {
            ...logContext,
            metadata: {
                ...logContext?.metadata,
                eventType: 'cron_job',
                jobName,
                status,
            },
        });
        this.adapter[level](entry);
    }

    logEmailProcessing(event: string, emailId: string, logContext?: LogContext) {
        const entry = this.createLogEntry('log', `Email Processing: ${event} for email ${emailId}`, 'EmailProcessing', {
            ...logContext,
            metadata: {
                ...logContext?.metadata,
                eventType: 'email_processing',
                event,
                emailId,
            },
        });
        this.adapter.log(entry);
    }

    private createLogEntry(level: LogLevel, message: string, context?: string | undefined, logContext?: LogContext): LogEntry {
        return {
            level,
            message,
            timestamp: new Date(),
            context,
            logContext,
        };
    }
}
