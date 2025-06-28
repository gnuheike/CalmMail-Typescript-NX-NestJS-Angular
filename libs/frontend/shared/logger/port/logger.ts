import { LogMessage } from '../model/log-message';

export abstract class LoggerPort {
    abstract log(message: LogMessage): Promise<void>;

    abstract info(message: string): Promise<void>;

    abstract error(message: string, error: unknown): Promise<void>;

    abstract warn(message: string): Promise<void>;
}
