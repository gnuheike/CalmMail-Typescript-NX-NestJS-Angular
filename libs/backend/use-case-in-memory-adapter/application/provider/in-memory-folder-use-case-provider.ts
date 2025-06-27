import { Provider } from '@nestjs/common';
import { GetFoldersUseCase } from '@calm-mail/backend-domain';
import { InMemoryGetFoldersUseCase } from '../../infrastructure/folder/in-memory-get-folders.usecase';

export function inMemoryFolderUseCaseProviders(): Provider[] {
    return [
        {
            provide: GetFoldersUseCase,
            useClass: InMemoryGetFoldersUseCase,
        },
    ];
}
