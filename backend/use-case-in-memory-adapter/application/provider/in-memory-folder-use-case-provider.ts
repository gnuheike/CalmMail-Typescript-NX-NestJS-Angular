import { Provider } from '@nestjs/common';
import { CreateFolderUseCase, GetFolderStatsUseCase, GetFoldersUseCase } from '@calm-mail/backend-domain';
import { InMemoryCreateFolderUseCase } from '../../infrastructure/folder/in-memory-create-folder.usecase';
import { InMemoryGetFolderStatsUseCase } from '../../infrastructure/folder/in-memory-get-folder-stats.usecase';
import { InMemoryGetFoldersUseCase } from '../../infrastructure/folder/in-memory-get-folders.usecase';

export function inMemoryFolderUseCaseProviders(): Provider[] {
    return [
        {
            provide: CreateFolderUseCase,
            useClass: InMemoryCreateFolderUseCase,
        },
        {
            provide: GetFolderStatsUseCase,
            useClass: InMemoryGetFolderStatsUseCase,
        },
        {
            provide: GetFoldersUseCase,
            useClass: InMemoryGetFoldersUseCase,
        },
    ];
}
