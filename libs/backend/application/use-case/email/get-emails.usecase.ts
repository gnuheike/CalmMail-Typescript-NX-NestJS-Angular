import { Email, GetEmailsRequest, GetEmailsResponse } from '@calm-mail/contract';
import { Injectable } from '@nestjs/common';

@Injectable()
export class GetEmailsUseCase {
    execute(input: GetEmailsRequest): Promise<GetEmailsResponse> {
        const pagination = {
            page: input.page,
            limit: input.limit,
            totalItems: 0,
            totalPages: 0,
        };
        const emails: Email[] = [];
        return Promise.resolve({ pagination, emails });
    }
}
