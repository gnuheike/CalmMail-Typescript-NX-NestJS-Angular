import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { Config, Environment } from './config.interface';

@Injectable()
export class AppConfigService {
    constructor(private readonly configService: ConfigService<Config, true>) {}

    get jwtSecret(): string {
        return this.configService.get('jwt.secret', { infer: true });
    }

    get jwtExpiresIn(): string {
        return this.configService.get('jwt.expiresIn', { infer: true });
    }

    get environment(): Environment {
        return this.configService.get('environment', { infer: true });
    }
}
