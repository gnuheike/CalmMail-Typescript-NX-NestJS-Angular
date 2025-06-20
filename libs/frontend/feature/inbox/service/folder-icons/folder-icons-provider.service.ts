import { Injectable } from '@angular/core';
import { FolderVm } from '../../model/folder/folder.vm';

@Injectable({
    providedIn: 'root',
})
export class FolderIconsProvider {
    // Map of folder names to their corresponding ionic icons
    private readonly folderIcons = {
        inbox: 'mail-outline',
        sent: 'paper-plane-outline',
        drafts: 'document-text-outline',
        trash: 'trash-outline',
        custom: 'folder-outline',
        default: 'folder-outline',
    };

    /**
     * Returns an appropriate icon based on the folder's name or icon property
     */
    getFolderIcon(folder: FolderVm): string {
        if (folder.icon) {
            return folder.icon;
        }

        if (folder.name in this.folderIcons) {
            const folderName = folder.name as keyof typeof this.folderIcons;
            return this.folderIcons[folderName];
        }

        return this.folderIcons.default;
    }
}
