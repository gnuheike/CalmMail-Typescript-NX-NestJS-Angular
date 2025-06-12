import { GetEmailsRequest, GetEmailsResponse } from '@calm-mail/contract';

export abstract class GetEmailsUseCase {
  abstract execute(input: GetEmailsRequest): Promise<GetEmailsResponse>;
}
