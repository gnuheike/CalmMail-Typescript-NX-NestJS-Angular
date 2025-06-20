import { inMemoryFolderUseCaseProviders } from './in-memory-folder-use-case-provider';
import { CreateFolderUseCase, GetFolderStatsUseCase, GetFoldersUseCase } from '@calm-mail/backend-domain';
import { InMemoryCreateFolderUseCase } from '../../infrastructure/folder/in-memory-create-folder.usecase';
import { InMemoryGetFolderStatsUseCase } from '../../infrastructure/folder/in-memory-get-folder-stats.usecase';
import { InMemoryGetFoldersUseCase } from '../../infrastructure/folder/in-memory-get-folders.usecase';

interface ClassProvider<P, T> {
    provide: P;
    useClass: T;
}

describe('inMemoryFolderUseCaseProviders', () => {
    it('should provide the correct providers', () => {
        // Act
        const providers = inMemoryFolderUseCaseProviders();

        // Assert
        expect(providers).toBeDefined();
        expect(providers.length).toBe(3);

        // Check CreateFolderUseCase provider
        const createFolderProvider = providers.find(p => (p as ClassProvider<typeof CreateFolderUseCase, typeof InMemoryCreateFolderUseCase>).provide === CreateFolderUseCase);
        expect(createFolderProvider).toBeDefined();
        expect((createFolderProvider as ClassProvider<typeof CreateFolderUseCase, typeof InMemoryCreateFolderUseCase>).useClass).toBe(InMemoryCreateFolderUseCase);

        // Check GetFolderStatsUseCase provider
        const getFolderStatsProvider = providers.find(p => (p as ClassProvider<typeof GetFolderStatsUseCase, typeof InMemoryGetFolderStatsUseCase>).provide === GetFolderStatsUseCase);
        expect(getFolderStatsProvider).toBeDefined();
        expect((getFolderStatsProvider as ClassProvider<typeof GetFolderStatsUseCase, typeof InMemoryGetFolderStatsUseCase>).useClass).toBe(InMemoryGetFolderStatsUseCase);

        // Check GetFoldersUseCase provider
        const getFoldersProvider = providers.find(p => (p as ClassProvider<typeof GetFoldersUseCase, typeof InMemoryGetFoldersUseCase>).provide === GetFoldersUseCase);
        expect(getFoldersProvider).toBeDefined();
        expect((getFoldersProvider as ClassProvider<typeof GetFoldersUseCase, typeof InMemoryGetFoldersUseCase>).useClass).toBe(InMemoryGetFoldersUseCase);
    });

    it('should return an array of providers', () => {
        // Act
        const providers = inMemoryFolderUseCaseProviders();

        // Assert
        expect(Array.isArray(providers)).toBe(true);
    });
});
