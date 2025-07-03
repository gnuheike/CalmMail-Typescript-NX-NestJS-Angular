import { Injectable } from '@angular/core';
import { FolderEntity, FolderIconsProviderPort } from '@calm-mail/frontend-domain';

@Injectable({
    providedIn: 'root',
})
export class StaticFolderIconsProviderAdapter extends FolderIconsProviderPort {
    // Map of folder roles to their corresponding ionic icons
    private readonly folderIcons = {
        inbox: 'mail-outline',
        sent: 'paper-plane-outline',
        drafts: 'document-text-outline',
        trash: 'trash-outline',
        spam: 'alert-circle-outline',
        archive: 'archive-outline',
        default: 'folder-outline',
    };

    /**
     * Returns an appropriate icon based on the folder's role or icon property
     */
    getFolderIcon(folder: FolderEntity): string {
        if (folder.icon) {
            return folder.icon;
        }

        if (folder.role && folder.role in this.folderIcons) {
            const folderRole = folder.role as keyof typeof this.folderIcons;
            return this.folderIcons[folderRole];
        }

        return this.folderIcons.default;
    }
}
