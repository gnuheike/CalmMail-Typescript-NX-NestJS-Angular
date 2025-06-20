export interface LoggerMessageParams {
    [key: string]: string;
}

export interface LogMessage {
    message: string;
    level: 'error' | 'warn' | 'log';
    params?: LoggerMessageParams;
}

export abstract class LoggerPort {
    abstract log(message: LogMessage): Promise<void>;

    abstract info(message: string): Promise<void>;

    abstract error(message: string, error: unknown): Promise<void>;

    abstract warn(message: string): Promise<void>;
}
