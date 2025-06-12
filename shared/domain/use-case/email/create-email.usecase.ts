import { CreateEmailRequest, CreateEmailResponse } from 'shared/contract';

export abstract class CreateEmailUseCase {
  abstract execute(input: CreateEmailRequest): Promise<CreateEmailResponse>;
}
