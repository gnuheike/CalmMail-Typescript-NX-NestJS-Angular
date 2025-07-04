import { DynamicModule, Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { AppLogger, ConsoleLoggingAdapter, LoggerPort } from '@calm-mail/backend-infrastructure';

@Module({})
export class LoggingModule {
    static forRootAsync(): DynamicModule {
        return {
            module: LoggingModule,
            imports: [ConfigModule],
            providers: [
                {
                    provide: LoggerPort,
                    useClass: ConsoleLoggingAdapter,
                },
            ],
            exports: [AppLogger],
        };
    }
}
