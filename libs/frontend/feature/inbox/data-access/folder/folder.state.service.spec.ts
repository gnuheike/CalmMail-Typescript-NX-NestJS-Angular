import { TestBed } from '@angular/core/testing';
import { FolderStateService } from './folder.state.service';
import { of, throwError } from 'rxjs';
import { FolderGateway } from '@calm-mail/frontend-core-ports';

describe('FolderStateService', () => {
    let service: FolderStateService;
    let mockFolderGateway: jest.Mocked<FolderGateway>;

    beforeEach(() => {
        mockFolderGateway = {
            getFolders: jest.fn(),
        } as unknown as jest.Mocked<FolderGateway>;

        TestBed.configureTestingModule({
            providers: [FolderStateService, { provide: FolderGateway, useValue: mockFolderGateway }],
        });
    });

    it('should be created and load folders automatically', () => {
        // Arrange
        const mockResponse = {
            folders: [
                {
                    id: 'folder-1',
                    name: 'inbox' as const,
                    displayName: 'Inbox',
                    unreadCount: 5,
                    totalCount: 10,
                    isDefault: true,
                },
            ],
        };
        mockFolderGateway.getFolders.mockReturnValue(of(mockResponse));

        // Act
        service = TestBed.inject(FolderStateService);

        // Assert
        expect(service).toBeTruthy();
        expect(mockFolderGateway.getFolders).toHaveBeenCalled();
        expect(service.loading()).toBe(false); // After successful API call, loading should be false
        expect(service.data()).toBeTruthy();
        expect(service.data()?.length).toBe(1);
        expect(service.error()).toBeNull();
    });

    describe('loadFolders', () => {
        it('should set loading state and call the API', () => {
            // Arrange
            const mockResponse = {
                folders: [
                    {
                        id: 'folder-1',
                        name: 'inbox' as const,
                        displayName: 'Inbox',
                        unreadCount: 5,
                        totalCount: 10,
                        isDefault: true,
                    },
                    {
                        id: 'folder-2',
                        name: 'sent' as const,
                        displayName: 'Sent',
                        unreadCount: 0,
                        totalCount: 20,
                        isDefault: true,
                    },
                ],
            };
            mockFolderGateway.getFolders.mockReturnValue(of(mockResponse));
            service = TestBed.inject(FolderStateService);

            // Clear the initial call
            mockFolderGateway.getFolders.mockClear();

            // Act
            service.loadFolders();

            // Assert
            expect(mockFolderGateway.getFolders).toHaveBeenCalled();
            expect(service.loading()).toBe(false); // After successful API call, loading should be false
            expect(service.data()).toBeTruthy();
            expect(service.data()?.length).toBe(2);
            expect(service.error()).toBeNull();
        });

        it('should handle API errors', () => {
            // Arrange
            const errorMessage = 'API Error';
            mockFolderGateway.getFolders.mockReturnValue(throwError(() => errorMessage));
            service = TestBed.inject(FolderStateService);

            // Clear the initial call
            mockFolderGateway.getFolders.mockClear();

            // Act
            service.loadFolders();

            // Assert
            expect(mockFolderGateway.getFolders).toHaveBeenCalled();
            expect(service.loading()).toBe(false); // After error, loading should be false
            expect(service.data()).toBeNull();
            expect(service.error()).toBe(errorMessage);
        });
    });
});
