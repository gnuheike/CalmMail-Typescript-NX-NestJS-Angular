import { InMemoryCreateEmailUseCase } from './in-memory-create-email.usecase';
import { CreateEmailRequest } from '@calm-mail/contract';

describe('InMemoryCreateEmailUseCase', () => {
    let useCase: InMemoryCreateEmailUseCase;

    beforeEach(() => {
        useCase = new InMemoryCreateEmailUseCase();
    });

    it('should create a regular email', async () => {
        // Arrange
        const request: CreateEmailRequest = {
            subject: 'Test Subject',
            from: 'sender@example.com',
            to: ['recipient@example.com'],
            cc: [],
            bcc: [],
            body: 'Test body',
            folderId: 'clq1234567890inbox000000001',
        };

        // Act
        const result = await useCase.execute(request);

        // Assert
        expect(result).toBeDefined();
        expect(result.email).toBeDefined();
        expect(result.email.id).toBeDefined();
        expect(result.email.subject).toBe('Test Subject');
        expect(result.email.from).toBe('sender@example.com');
        expect(result.email.to).toEqual(['recipient@example.com']);
        expect(result.email.body).toBe('Test body');
        expect(result.email.folderId).toBe('clq1234567890inbox000000001');
        expect(result.email.isDraft).toBe(false);
    });

    it('should create a draft email', async () => {
        // Arrange
        const request: CreateEmailRequest = {
            subject: 'Draft Subject',
            from: 'user@example.com',
            to: ['recipient@example.com'],
            cc: [],
            bcc: [],
            body: 'Draft body',
            folderId: 'clq1234567890drafts00000001',
            saveAsDraft: true,
        };

        // Act
        const result = await useCase.execute(request);

        // Assert
        expect(result).toBeDefined();
        expect(result.email).toBeDefined();
        expect(result.email.id).toBeDefined();
        expect(result.email.subject).toBe('Draft Subject');
        expect(result.email.from).toBe('user@example.com');
        expect(result.email.to).toEqual(['recipient@example.com']);
        expect(result.email.body).toBe('Draft body');
        expect(result.email.folderId).toBe('clq1234567890drafts00000001');
        expect(result.email.isDraft).toBe(true);
    });

    it('should create a sent email', async () => {
        // Arrange
        const request: CreateEmailRequest = {
            subject: 'Sent Subject',
            from: 'user@example.com',
            to: ['recipient@example.com'],
            cc: [],
            bcc: [],
            body: 'Sent body',
            folderId: 'clq1234567890sent0000000001',
        };

        // Act
        const result = await useCase.execute(request);

        // Assert
        expect(result).toBeDefined();
        expect(result.email).toBeDefined();
        expect(result.email.id).toBeDefined();
        expect(result.email.subject).toBe('Sent Subject');
        expect(result.email.from).toBe('user@example.com');
        expect(result.email.to).toEqual(['recipient@example.com']);
        expect(result.email.body).toBe('Sent body');
        expect(result.email.folderId).toBe('clq1234567890sent0000000001');
        expect(result.email.read).toBe(true);
    });
});
