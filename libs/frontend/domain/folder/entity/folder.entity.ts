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
export class FolderEntity {
    constructor(
        public readonly id: FolderId,
        public readonly name: string,
        public readonly displayName: string,
        public readonly unreadCount: number,
        public readonly totalCount: number,
        public readonly isDefault: boolean,
        public readonly icon?: string,
    ) {}
}
