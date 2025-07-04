import { Module } from '@nestjs/common';
import { EmailModule } from '../email/email.module';
import { FolderModule } from '../folder/folder.module';
import { ConfigModule } from '@nestjs/config';
import { ThrottlerModule } from '@nestjs/throttler';
import { LoggingModule } from '../logging/loading-module.provider';

@Module({
    imports: [
        ConfigModule,
        ThrottlerModule.forRoot({
            throttlers: [
                {
                    ttl: 60000,
                    limit: 10,
                },
            ],
        }),
        LoggingModule,
        EmailModule,
        FolderModule,
    ],
})
export class AppModule {}
