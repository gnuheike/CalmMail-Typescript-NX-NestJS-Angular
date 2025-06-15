import { Module } from '@nestjs/common';
import { EmailController } from './email.controller';
import { inMemoryEmailUseCaseProviders } from '@calm-mail/backend-use-case-in-memory-adapter';

@Module({
    controllers: [EmailController],
    providers: [...inMemoryEmailUseCaseProviders()],
})
export class EmailModule {}
