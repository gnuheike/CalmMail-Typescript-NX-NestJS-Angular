import { Provider } from '@angular/core';
import { InMemoryFolderGateway } from './in-memory-folder-gateway.service';
import { FolderGateway } from '@calm-mail/frontend/core-ports';

export function inMemoryFolderGatewayProvider(): Provider[] {
    return [
        {
            provide: FolderGateway,
            useClass: InMemoryFolderGateway,
        },
    ];
}
