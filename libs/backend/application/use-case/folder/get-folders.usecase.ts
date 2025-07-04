import { GetFoldersRequest, GetFoldersResponse } from '@calm-mail/contract';
import { Injectable } from '@nestjs/common';

@Injectable()
export class GetFoldersUseCase {
    execute(input?: GetFoldersRequest): Promise<GetFoldersResponse> {
        throw new Error('Method not implemented.');
    }
}
