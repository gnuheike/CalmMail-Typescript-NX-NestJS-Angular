export interface LogMessageParams {
    originalError?: unknown;
    code?: string | number;
}

export type LogMessageLevel = 'error' | 'warn' | 'log';
export type LogMessageType = 'network' | 'validation' | 'server' | 'auth';

export class LogMessage {
    constructor(
        public readonly message: string,
        public readonly level: LogMessageLevel,
        public readonly type: LogMessageType,
        public readonly params?: LogMessageParams,
    ) {}

    static fromUnknownError(error: unknown, level: LogMessageLevel = 'error', type: LogMessageType = 'server'): LogMessage {
        const message: string = error instanceof Error ? error.message : (error as string);
        return new LogMessage(message, level, type, { originalError: error });
    }
}
