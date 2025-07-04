import { Module } from '@nestjs/common';
import { ConfigModule as NestConfigModule } from '@nestjs/config';
import configuration from './configuration';
import { validationSchema } from './config.validation';
import { AppConfigService } from './config.service';

@Module({
    imports: [
        NestConfigModule.forRoot({
            load: [configuration],
            validationSchema,
            validationOptions: {
                abortEarly: false,
            },
        }),
    ],
    providers: [AppConfigService],
})
export class ConfigModule {}
