import { CreateEmailRequest, CreateEmailResponse } from '@calm-mail/contract';

export abstract class CreateEmailUseCase {
  abstract execute(input: CreateEmailRequest): Promise<CreateEmailResponse>;
}
