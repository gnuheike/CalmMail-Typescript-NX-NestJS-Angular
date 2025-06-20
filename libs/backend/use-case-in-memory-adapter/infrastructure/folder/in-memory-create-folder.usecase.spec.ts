import { InMemoryCreateFolderUseCase } from './in-memory-create-folder.usecase';
import { InMemoryGetFoldersUseCase } from './in-memory-get-folders.usecase';
import { CreateFolderRequest } from '@calm-mail/contract';

describe('InMemoryCreateFolderUseCase', () => {
    let useCase: InMemoryCreateFolderUseCase;
    let getFoldersUseCase: InMemoryGetFoldersUseCase;

    beforeEach(() => {
        getFoldersUseCase = new InMemoryGetFoldersUseCase();
        useCase = new InMemoryCreateFolderUseCase(getFoldersUseCase);
    });

    it('should create a folder without a parent', async () => {
        // Arrange
        const request: CreateFolderRequest = {
            name: 'custom',
            displayName: 'Test Folder',
        };

        // Act
        const result = await useCase.execute(request);

        // Assert
        expect(result).toBeDefined();
        expect(result.folder).toBeDefined();
        expect(result.folder.id).toBeDefined();
        expect(result.folder.displayName).toBe('Test Folder');
        expect(result.folder.name).toBe('custom');
        expect(result.folder.icon).toBe('folder');
        expect(result.folder.isDefault).toBe(false);
        expect(result.folder.unreadCount).toBe(0);
        expect(result.folder.totalCount).toBe(0);
        expect(result.folder.parentId).toBeUndefined();
    });

    it('should create a folder with a valid parent', async () => {
        // Arrange
        // First get an existing folder to use as parent
        const foldersResponse = await getFoldersUseCase.execute();
        // Ensure we have at least one folder
        expect(foldersResponse.folders.length).toBeGreaterThan(0);

        const parentFolder = foldersResponse.folders[0]; // Use the first folder as parent
        // Ensure the folder is defined
        expect(parentFolder).toBeDefined();

        // If parentFolder is undefined, the test will fail at the expect above
        // This non-null assertion is safe in this context
        const request: CreateFolderRequest = {
            name: 'custom',
            displayName: 'Child Folder',
            parentId: parentFolder?.id,
        };

        // Act
        const result = await useCase.execute(request);

        // Assert
        expect(result).toBeDefined();
        expect(result.folder).toBeDefined();
        expect(result.folder.id).toBeDefined();
        expect(result.folder.displayName).toBe('Child Folder');
        expect(result.folder.parentId).toBe(parentFolder?.id);
    });

    it('should throw an error when parent folder does not exist', async () => {
        // Arrange
        const request: CreateFolderRequest = {
            name: 'custom',
            displayName: 'Orphan Folder',
            parentId: 'non-existent-parent-id',
        };

        // Act & Assert
        await expect(useCase.execute(request)).rejects.toThrow('Parent folder with ID non-existent-parent-id not found');
    });

    it('should generate a unique ID for each folder', async () => {
        // Arrange
        const request1: CreateFolderRequest = {
            name: 'custom',
            displayName: 'Folder 1',
        };
        const request2: CreateFolderRequest = {
            name: 'custom',
            displayName: 'Folder 2',
        };

        // Act
        const result1 = await useCase.execute(request1);
        const result2 = await useCase.execute(request2);

        // Assert
        expect(result1.folder.id).not.toBe(result2.folder.id);
    });
});
