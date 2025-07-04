import { Module } from '@nestjs/common';
import { EmailModule } from '../email/email.module';
import { FolderModule } from '../folder/folder.module';
import { ConfigModule } from '@nestjs/config';
import { ThrottlerModule } from '@nestjs/throttler';

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
        EmailModule,
        FolderModule,
    ],
})
export class AppModule {}
