import { Provider } from '@angular/core';
import { InMemoryFolderGateway } from '../adapter/mock/folder/in-memory-folder-gateway.service';
import { FolderGateway } from '@calm-mail/frontend-application';

export function inMemoryFolderGatewayProviders(): Provider[] {
    return [
        {
            provide: FolderGateway,
            useClass: InMemoryFolderGateway,
        },
    ];
}
