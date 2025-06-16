import { inMemoryEmailUseCaseProviders } from './in-memory-email-use-case.provider';
import { CreateEmailUseCase, GetEmailsUseCase } from '@calm-mail/backend-domain';
import { InMemoryCreateEmailUseCase, InMemoryGetEmailsUseCase } from '../../infrastructure/email';

interface ClassProvider<P, T> {
    provide: P;
    useClass: T;
}

describe('inMemoryEmailUseCaseProviders', () => {
    it('should provide the correct providers', () => {
        // Act
        const providers = inMemoryEmailUseCaseProviders();

        // Assert
        expect(providers).toBeDefined();
        expect(providers.length).toBe(2);

        // Check GetEmailsUseCase provider
        const getEmailsProvider = providers.find(p => (p as ClassProvider<typeof GetEmailsUseCase, typeof InMemoryGetEmailsUseCase>).provide === GetEmailsUseCase);
        expect(getEmailsProvider).toBeDefined();
        expect((getEmailsProvider as ClassProvider<typeof GetEmailsUseCase, typeof InMemoryGetEmailsUseCase>).useClass).toBe(InMemoryGetEmailsUseCase);

        // Check CreateEmailUseCase provider
        const createEmailProvider = providers.find(p => (p as ClassProvider<typeof CreateEmailUseCase, typeof InMemoryCreateEmailUseCase>).provide === CreateEmailUseCase);
        expect(createEmailProvider).toBeDefined();
        expect((createEmailProvider as ClassProvider<typeof CreateEmailUseCase, typeof InMemoryCreateEmailUseCase>).useClass).toBe(InMemoryCreateEmailUseCase);
    });

    it('should return an array of providers', () => {
        // Act
        const providers = inMemoryEmailUseCaseProviders();

        // Assert
        expect(Array.isArray(providers)).toBe(true);
    });
});
