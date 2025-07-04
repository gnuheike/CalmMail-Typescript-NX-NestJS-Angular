export type LogLevel = 'error' | 'warn' | 'log' | 'debug' | 'verbose';

export interface LogContext {
    correlationId?: string;
    userId?: string;
    userEmail?: string;
    operation?: string;
    component?: string;
    metadata?: Record<string, unknown>;
}

export interface LogEntry {
    level: LogLevel;
    message: string;
    timestamp: Date;
    context: string | undefined;
    logContext: LogContext | undefined;
    error?: {
        name: string;
        message: string;
        stack?: string;
    };
}

export abstract class LoggerPort {
    abstract log(entry: LogEntry): void | Promise<void>;

    abstract error(entry: LogEntry): void | Promise<void>;

    abstract warn(entry: LogEntry): void | Promise<void>;

    abstract debug(entry: LogEntry): void | Promise<void>;

    abstract verbose(entry: LogEntry): void | Promise<void>;
}
