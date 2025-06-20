import { InMemoryGetFoldersUseCase } from './in-memory-get-folders.usecase';
import { GetFoldersRequest } from '@calm-mail/contract';

describe('InMemoryGetFoldersUseCase', () => {
    let useCase: InMemoryGetFoldersUseCase;

    beforeEach(() => {
        useCase = new InMemoryGetFoldersUseCase();
    });

    it('should return all folders when no filters are provided', async () => {
        // Act
        const result = await useCase.execute();

        // Assert
        expect(result).toBeDefined();
        expect(result.folders).toBeDefined();
        expect(result.folders.length).toBeGreaterThan(0);
        // Verify that default folders are included
        expect(result.folders.some(f => f.name === 'inbox')).toBe(true);
        expect(result.folders.some(f => f.name === 'sent')).toBe(true);
        expect(result.folders.some(f => f.name === 'drafts')).toBe(true);
        expect(result.folders.some(f => f.name === 'trash')).toBe(true);
        // Verify that custom folders are included
        expect(result.folders.some(f => f.displayName === 'Work')).toBe(true);
        expect(result.folders.some(f => f.displayName === 'Family')).toBe(true);
        expect(result.folders.some(f => f.displayName === 'Finance')).toBe(true);
        expect(result.folders.some(f => f.displayName === 'Travel')).toBe(true);
        expect(result.folders.some(f => f.displayName === 'Archive')).toBe(true);
    });

    it('should filter out empty folders when includeEmpty is false', async () => {
        // Arrange
        const request: GetFoldersRequest = {
            includeEmpty: false
        };

        // Act
        const result = await useCase.execute(request);

        // Assert
        expect(result).toBeDefined();
        expect(result.folders).toBeDefined();
        // All folders with totalCount === 0 should be filtered out
        expect(result.folders.every(f => f.totalCount > 0)).toBe(true);
    });

    it('should filter out custom folders when includeCustom is false', async () => {
        // Arrange
        const request: GetFoldersRequest = {
            includeCustom: false
        };

        // Act
        const result = await useCase.execute(request);

        // Assert
        expect(result).toBeDefined();
        expect(result.folders).toBeDefined();
        // All folders should be default folders
        expect(result.folders.every(f => f.isDefault)).toBe(true);
        // No custom folders should be included
        expect(result.folders.some(f => f.displayName === 'Work')).toBe(false);
        expect(result.folders.some(f => f.displayName === 'Family')).toBe(false);
    });

    it('should apply both filters when both are provided', async () => {
        // Arrange
        const request: GetFoldersRequest = {
            includeEmpty: false,
            includeCustom: false
        };

        // Act
        const result = await useCase.execute(request);

        // Assert
        expect(result).toBeDefined();
        expect(result.folders).toBeDefined();
        // All folders should be default folders with totalCount > 0
        expect(result.folders.every(f => f.isDefault && f.totalCount > 0)).toBe(true);
    });
});
