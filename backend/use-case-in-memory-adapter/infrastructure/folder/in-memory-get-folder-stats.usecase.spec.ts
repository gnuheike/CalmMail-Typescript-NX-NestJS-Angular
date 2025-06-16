import { InMemoryGetFolderStatsUseCase } from './in-memory-get-folder-stats.usecase';
import { InMemoryGetFoldersUseCase } from './in-memory-get-folders.usecase';
import { Folder, GetFolderStatsRequest } from '@calm-mail/contract';

describe('InMemoryGetFolderStatsUseCase', () => {
    let useCase: InMemoryGetFolderStatsUseCase;
    let getFoldersUseCase: InMemoryGetFoldersUseCase;

    beforeEach(async () => {
        getFoldersUseCase = new InMemoryGetFoldersUseCase();
        useCase = new InMemoryGetFolderStatsUseCase(getFoldersUseCase);

        // Ensure we have folders to test with
        const foldersResponse = await getFoldersUseCase.execute();
        expect(foldersResponse.folders.length).toBeGreaterThan(0);
    });

    it('should return stats for an existing folder', async () => {
        // Arrange
        const foldersResponse = await getFoldersUseCase.execute();
        // Ensure we have at least one folder
        expect(foldersResponse.folders.length).toBeGreaterThan(0);

        let testFolder = foldersResponse.folders[0]; // Use the first folder
        // Ensure the folder is defined
        expect(testFolder).toBeDefined();

        testFolder = testFolder as Folder;

        // If testFolder is undefined, the test will fail at the expect above
        // This non-null assertion is safe in this context
        const request: GetFolderStatsRequest = {
            folderId: testFolder.id,
        };

        // Act
        const result = await useCase.execute(request);

        // Assert
        expect(result).toBeDefined();
        expect(result.stats).toBeDefined();
        expect(result.stats.folderId).toBe(testFolder?.id);
        expect(result.stats.unreadCount).toBe(testFolder?.unreadCount);
        expect(result.stats.totalCount).toBe(testFolder?.totalCount);
        expect(result.stats.lastUpdated).toBeInstanceOf(Date);
        expect(typeof result.stats.sizeInBytes).toBe('number');
    });

    it('should throw an error for a non-existent folder', async () => {
        // Arrange
        const request: GetFolderStatsRequest = {
            folderId: 'non-existent-folder-id',
        };

        // Act & Assert
        await expect(useCase.execute(request)).rejects.toThrow('Folder with ID non-existent-folder-id not found');
    });

    it('should return stats with random size for inbox folder', async () => {
        // Arrange
        const foldersResponse = await getFoldersUseCase.execute();
        let inboxFolder = foldersResponse.folders.find((f) => f.name === 'inbox');
        expect(inboxFolder).toBeDefined();
        inboxFolder = inboxFolder as Folder;

        // If inboxFolder is undefined, the test will fail at the expect above
        // This non-null assertion is safe in this context
        const request: GetFolderStatsRequest = {
            folderId: inboxFolder.id,
        };

        // Act
        const result = await useCase.execute(request);

        // Assert
        expect(result).toBeDefined();
        expect(result.stats).toBeDefined();
        expect(result.stats.folderId).toBe(inboxFolder.id);
        expect(result.stats.sizeInBytes).toBeGreaterThanOrEqual(0);
        expect(result.stats.sizeInBytes).toBeLessThanOrEqual(1000000); // Based on the implementation
    });
});
