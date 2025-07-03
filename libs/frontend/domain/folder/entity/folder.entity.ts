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
 * - name: User-facing display name for the folder
 * - role: System role of the folder (inbox, sent, etc.) or null for custom folders
 * - unreadCount: Number of unread emails in the folder
 * - totalCount: Total number of emails in the folder
 */
export class FolderEntity {
    constructor(
        public readonly id: FolderId,
        public readonly name: string,
        public readonly role: string | null,
        public readonly unreadCount: number,
        public readonly totalCount: number,
        public readonly sizeInBytes?: number,
        public readonly lastSyncAt?: Date | null,
        public readonly icon?: string,
    ) {}
}
