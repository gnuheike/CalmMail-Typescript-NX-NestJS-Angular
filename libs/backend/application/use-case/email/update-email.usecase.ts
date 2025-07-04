import { GetEmailsResponse, UpdateEmailRequest } from '@calm-mail/contract';

export abstract class UpdateEmailUseCase {
    abstract execute(input: UpdateEmailRequest): Promise<GetEmailsResponse>;
}
