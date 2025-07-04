import { TsRestHandler, tsRestHandler } from '@ts-rest/nest';
import { Controller } from '@nestjs/common';
import { CreateEmailUseCase, GetEmailsUseCase, UpdateEmailUseCase } from '@calm-mail/backend-application';
import { emailRouterContract } from '@calm-mail/contract';

@Controller()
export class EmailController {
    constructor(
        private readonly getEmailsUseCase: GetEmailsUseCase,
        private readonly createEmailUseCase: CreateEmailUseCase,
        private readonly updateEmailUseCase: UpdateEmailUseCase,
    ) {}

    @TsRestHandler(emailRouterContract.getEmails)
    async getEmails() {
        return tsRestHandler(emailRouterContract.getEmails, async ({ query }) => {
            const result = await this.getEmailsUseCase.execute(query);
            return { status: 200, body: result };
        });
    }

    @TsRestHandler(emailRouterContract.createEmail)
    async createEmail() {
        return tsRestHandler(emailRouterContract.createEmail, async ({ body }) => {
            const result = await this.createEmailUseCase.execute(body);
            return { status: 201, body: result };
        });
    }
}
