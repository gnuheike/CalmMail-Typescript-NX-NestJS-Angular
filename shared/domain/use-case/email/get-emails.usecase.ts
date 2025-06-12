import { GetEmailsRequest, GetEmailsResponse } from 'shared/contract';

export abstract class GetEmailsUseCase {
  abstract execute(input: GetEmailsRequest): Promise<GetEmailsResponse>;
}
