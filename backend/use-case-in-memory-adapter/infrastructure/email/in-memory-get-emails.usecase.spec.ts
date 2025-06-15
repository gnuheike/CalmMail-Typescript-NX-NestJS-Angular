import { InMemoryGetEmailsUseCase } from './in-memory-get-emails.usecase';
import { GetEmailsRequest } from '@calm-mail/contract';

describe('InMemoryGetEmailsUseCase', () => {
    let useCase: InMemoryGetEmailsUseCase;

    beforeEach(() => {
        useCase = new InMemoryGetEmailsUseCase();
    });

    it('should return mock emails when no folder ID is provided', async () => {
        // Arrange
        const request: GetEmailsRequest = {
            page: 1,
            limit: 20,
        };

        // Act
        const result = await useCase.execute(request);

        // Assert
        expect(result).toBeDefined();
        expect(result.emails).toBeDefined();
        expect(result.emails.length).toBeGreaterThan(0);
        expect(result.pagination).toBeDefined();
        expect(result.pagination.page).toBe(1);
        expect(result.pagination.limit).toBe(20);
    });

    it('should return mock emails for a specific folder', async () => {
        // Arrange
        const folderId = 'clq1234567890inbox000000001';
        const request: GetEmailsRequest = {
            folderId,
            page: 1,
            limit: 20,
        };

        // Act
        const result = await useCase.execute(request);

        // Assert
        expect(result).toBeDefined();
        expect(result.emails).toBeDefined();
        expect(result.emails.length).toBeGreaterThan(0);
        expect(result.emails.every((email) => email.folderId === folderId)).toBe(true);
        expect(result.pagination).toBeDefined();
        expect(result.pagination.page).toBe(1);
        expect(result.pagination.limit).toBe(20);
    });

    it('should apply pagination correctly', async () => {
        // Arrange
        const folderId = 'clq1234567890inbox000000001';
        const request: GetEmailsRequest = {
            folderId,
            page: 2,
            limit: 1,
        };

        // Act
        const result = await useCase.execute(request);

        // Assert
        expect(result).toBeDefined();
        expect(result.emails).toBeDefined();
        expect(result.pagination).toBeDefined();
        expect(result.pagination.page).toBe(2);
        expect(result.pagination.limit).toBe(1);
    });
});
