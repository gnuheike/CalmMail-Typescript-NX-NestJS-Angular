import { Folder } from '@calm-mail/contract';
import { FolderEntity, FolderId } from '@calm-mail/frontend-domain';

/**
 * Maps a domain Folder model to a FolderVm view-model.
 * This function should be used in facades or selectors to convert domain models to view-models.
 *
 * @param folder The domain Folder model
 * @returns A FolderVm view-model
 */
export function mapToFolderVm(folder: Folder): FolderEntity {
    return new FolderEntity(
        FolderId.fromString(folder.id),
        folder.name,
        folder.role,
        folder.unreadCount,
        folder.totalCount,
        folder.sizeInBytes,
        folder.lastSyncAt,
        folder.icon || undefined,
    );
}

/**
 * Maps an array of domain Folder models to an array of FolderVm view-models.
 *
 * @param folders An array of domain Folder models
 * @returns An array of FolderVm view-models
 */
export function mapToFolderVms(folders: Folder[]): FolderEntity[] {
    return folders.map(mapToFolderVm);
}
