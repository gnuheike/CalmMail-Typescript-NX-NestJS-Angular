import { CreateEmailRequest, CreateEmailResponse, Email } from '@calm-mail/contract';
import { Injectable } from '@nestjs/common';

@Injectable()
export class CreateEmailUseCase {
    execute(input: CreateEmailRequest): Promise<CreateEmailResponse> {
        return Promise.resolve({ email: input as Email });
    }
}
