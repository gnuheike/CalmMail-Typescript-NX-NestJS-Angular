import { Module } from '@nestjs/common';
import { EmailController } from './email.controller';
import { CreateEmailUseCase, GetEmailsUseCase } from '@calm-mail/backend-application';

@Module({
    controllers: [EmailController],
    providers: [GetEmailsUseCase, CreateEmailUseCase],
})
export class EmailModule {}
