import { Provider } from '@angular/core';
import { FolderIconsProviderPort } from '@calm-mail/frontend-domain';
import { StaticFolderIconsProviderAdapter } from './folder-icons-provider.service';

export function staticFolderIconsProvider(): Provider[] {
    return [
        {
            provide: FolderIconsProviderPort,
            useExisting: StaticFolderIconsProviderAdapter,
        },
    ];
}
