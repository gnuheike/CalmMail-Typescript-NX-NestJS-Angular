import { TsRestHandler, tsRestHandler } from '@ts-rest/nest';
import { Controller } from '@nestjs/common';
import { CreateEmailUseCase, GetEmailsUseCase } from '@calm-mail/backend-domain';
import { emailContract } from '@calm-mail/contract';

@Controller()
export class EmailController {
    constructor(
        private readonly getEmailsUseCase: GetEmailsUseCase,
        private readonly createEmailUseCase: CreateEmailUseCase,
    ) {}

    @TsRestHandler(emailContract.getEmails)
    async getEmails() {
        return tsRestHandler(emailContract.getEmails, async ({ query }) => {
            const result = await this.getEmailsUseCase.execute(query);
            return { status: 200, body: result };
        });
    }

    @TsRestHandler(emailContract.createEmail)
    async createEmail() {
        return tsRestHandler(emailContract.createEmail, async ({ body }) => {
            const result = await this.createEmailUseCase.execute(body);
            return { status: 201, body: result };
        });
    }
}
