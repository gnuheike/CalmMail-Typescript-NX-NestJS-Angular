import { TestBed } from '@angular/core/testing';
import { FolderIconsProvider } from './folder-icons-provider.service';
import { FolderId } from '../../model/folder/folder.vm';

describe('FolderIconsProvider', () => {
    let service: FolderIconsProvider;

    beforeEach(() => {
        TestBed.configureTestingModule({
            providers: [FolderIconsProvider],
        });
        service = TestBed.inject(FolderIconsProvider);
    });

    it('should be created', () => {
        expect(service).toBeTruthy();
    });

    describe('getFolderIcon', () => {
        it('should return the folder icon if provided', () => {
            const folder = {
                id: FolderId.fromString('test-id'),
                name: 'custom',
                displayName: 'Custom Folder',
                unreadCount: 0,
                totalCount: 0,
                isDefault: false,
                icon: 'custom-icon',
            };

            const icon = service.getFolderIcon(folder);
            expect(icon).toBe('custom-icon');
        });

        it('should return the appropriate icon for inbox folder', () => {
            const folder = {
                id: FolderId.fromString('test-id'),
                name: 'inbox',
                displayName: 'Inbox',
                unreadCount: 0,
                totalCount: 0,
                isDefault: true,
                icon: undefined,
            };

            const icon = service.getFolderIcon(folder);
            expect(icon).toBe('mail-outline');
        });

        it('should return the appropriate icon for sent folder', () => {
            const folder = {
                id: FolderId.fromString('test-id'),
                name: 'sent',
                displayName: 'Sent',
                unreadCount: 0,
                totalCount: 0,
                isDefault: true,
                icon: undefined,
            };

            const icon = service.getFolderIcon(folder);
            expect(icon).toBe('paper-plane-outline');
        });

        it('should return the appropriate icon for drafts folder', () => {
            const folder = {
                id: FolderId.fromString('test-id'),
                name: 'drafts',
                displayName: 'Drafts',
                unreadCount: 0,
                totalCount: 0,
                isDefault: true,
                icon: undefined,
            };

            const icon = service.getFolderIcon(folder);
            expect(icon).toBe('document-text-outline');
        });

        it('should return the appropriate icon for trash folder', () => {
            const folder = {
                id: FolderId.fromString('test-id'),
                name: 'trash',
                displayName: 'Trash',
                unreadCount: 0,
                totalCount: 0,
                isDefault: true,
                icon: undefined,
            };

            const icon = service.getFolderIcon(folder);
            expect(icon).toBe('trash-outline');
        });

        it('should return the default icon for unknown folder types', () => {
            const folder = {
                id: FolderId.fromString('test-id'),
                name: 'unknown',
                displayName: 'Unknown Folder',
                unreadCount: 0,
                totalCount: 0,
                isDefault: false,
                icon: undefined,
            };

            const icon = service.getFolderIcon(folder);
            expect(icon).toBe('folder-outline');
        });
    });
});
