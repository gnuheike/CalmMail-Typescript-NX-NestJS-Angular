import { CreateFolderRequest, CreateFolderResponse } from '@calm-mail/contract';
import { Injectable } from '@nestjs/common';

@Injectable()
export class CreateFolderUseCase {
    execute(input: CreateFolderRequest): Promise<CreateFolderResponse> {
        throw new Error('Method not implemented.');
    }
}
