import { Folder } from '@calm-mail/contract';
import { ValueObject } from '@calm-mail/shared-domain';

export class FolderId extends ValueObject<string> {
    protected _type!: void;

    static fromString(id: string): FolderId {
        return new FolderId(id);
    }
}

/**
 * FolderVm (View Model)
 *
 * A thin view-model representation of a Folder entity for UI components.
 * This decouples the UI from the domain model, allowing each to evolve independently.
 *
 * Properties:
 * - id: Unique identifier (FolderId value object)
 * - name: Folder type (inbox, sent, drafts, trash, or custom)
 * - displayName: User-friendly name for the folder
 * - unreadCount: Number of unread emails in the folder
 * - totalCount: Total number of emails in the folder
 * - isDefault: Whether this is a system default folder
 */
export interface FolderVm {
    id: FolderId;
    name: string;
    displayName: string;
    unreadCount: number;
    totalCount: number;
    isDefault: boolean;
    icon: string | undefined;
}

/**
 * Maps a domain Folder model to a FolderVm view-model.
 * This function should be used in facades or selectors to convert domain models to view-models.
 *
 * @param folder The domain Folder model
 * @returns A FolderVm view-model
 */
export function mapToFolderVm(folder: Folder): FolderVm {
    return {
        id: FolderId.fromString(folder.id),
        name: folder.name,
        displayName: folder.displayName,
        unreadCount: folder.unreadCount,
        totalCount: folder.totalCount,
        isDefault: folder.isDefault,
        icon: folder.icon || undefined,
    };
}

/**
 * Maps an array of domain Folder models to an array of FolderVm view-models.
 *
 * @param folders An array of domain Folder models
 * @returns An array of FolderVm view-models
 */
export function mapToFolderVms(folders: Folder[]): FolderVm[] {
    return folders.map(mapToFolderVm);
}
