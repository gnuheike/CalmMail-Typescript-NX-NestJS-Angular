import { Provider } from '@angular/core';
import { InMemoryFolderRepositoryAdapter } from './in-memory-folder.repository.adapter.service';
import { FolderRepositoryPort } from '@calm-mail/frontend-domain';

export function inMemoryFolderRepositoryProvider(): Provider[] {
    return [
        {
            provide: FolderRepositoryPort,
            useClass: InMemoryFolderRepositoryAdapter,
        },
    ];
}
