import { TestBed } from '@angular/core/testing';
import { InboxStateFacade } from './inbox.facade';

import { computed, signal } from '@angular/core';
import { FolderStateService } from './folder/folder.state.service';
import { EmailStateService } from './email/email.state.service';
import { FolderId } from '../model/folder/folder.vm';

describe('InboxStateFacade', () => {
    let facade: InboxStateFacade;
    let mockFolderStateService: jest.Mocked<FolderStateService>;
    let mockEmailStateService: jest.Mocked<EmailStateService>;

    beforeEach(() => {
        // Create mock services with Jest mocks
        mockFolderStateService = {
            loadFolders: jest.fn(),
            loading: computed(() => false),
            error: computed(() => null),
            data: computed(() => []),
        } as unknown as jest.Mocked<FolderStateService>;

        mockEmailStateService = {
            loadEmailsForFolder: jest.fn(),
            selectFolder: jest.fn(),
            loading: computed(() => false),
            error: computed(() => null),
            data: computed(() => []),
            selectedFolder: signal(undefined),
        } as unknown as jest.Mocked<EmailStateService>;

        TestBed.configureTestingModule({
            providers: [
                InboxStateFacade,
                { provide: FolderStateService, useValue: mockFolderStateService },
                { provide: EmailStateService, useValue: mockEmailStateService },
            ],
        });

        facade = TestBed.inject(InboxStateFacade);
    });

    it('should be created', () => {
        expect(facade).toBeTruthy();
    });

    describe('selectFolder', () => {
        it('should call selectFolder and loadEmailsForFolder on EmailStateService', () => {
            // Arrange
            const mockFolder = {
                id: FolderId.fromString('test-folder-id'),
                name: 'inbox',
                displayName: 'Inbox',
                unreadCount: 5,
                totalCount: 10,
                isDefault: true,
                icon: 'mail-outline',
            };

            // Act
            facade.selectFolder(mockFolder);

            // Assert
            expect(mockEmailStateService.selectFolder).toHaveBeenCalledWith(mockFolder);
            expect(mockEmailStateService.loadEmailsForFolder).toHaveBeenCalledWith(mockFolder.id);
        });
    });

    describe('retryLoadFolders', () => {
        it('should call loadFolders on FolderStateService', () => {
            // Act
            facade.retryLoadFolders();

            // Assert
            expect(mockFolderStateService.loadFolders).toHaveBeenCalled();
        });
    });

    describe('anyLoading$', () => {
        it('should compute loading state from both services', () => {
            // Create signals that we can control
            const folderLoadingSignal = signal(false);
            const emailLoadingSignal = signal(false);

            // Set up mocks with signals we control
            mockFolderStateService = {
                loadFolders: jest.fn(),
                loading: computed(() => folderLoadingSignal()),
                error: computed(() => null),
                data: computed(() => []),
            } as unknown as jest.Mocked<FolderStateService>;

            mockEmailStateService = {
                loadEmailsForFolder: jest.fn(),
                selectFolder: jest.fn(),
                loading: computed(() => emailLoadingSignal()),
                error: computed(() => null),
                data: computed(() => []),
                selectedFolder: signal(undefined),
            } as unknown as jest.Mocked<EmailStateService>;

            // Reset the TestBed with our new mocks
            TestBed.resetTestingModule();
            TestBed.configureTestingModule({
                providers: [
                    InboxStateFacade,
                    { provide: FolderStateService, useValue: mockFolderStateService },
                    { provide: EmailStateService, useValue: mockEmailStateService },
                ],
            });

            facade = TestBed.inject(InboxStateFacade);

            // Initial state - both false
            expect(facade.anyLoading$()).toBe(false);

            // Set folder loading to true
            folderLoadingSignal.set(true);
            expect(facade.anyLoading$()).toBe(true);

            // Set folder loading to false, email loading to true
            folderLoadingSignal.set(false);
            emailLoadingSignal.set(true);
            expect(facade.anyLoading$()).toBe(true);

            // Both loading
            folderLoadingSignal.set(true);
            expect(facade.anyLoading$()).toBe(true);

            // Both not loading
            folderLoadingSignal.set(false);
            emailLoadingSignal.set(false);
            expect(facade.anyLoading$()).toBe(false);
        });
    });
});
