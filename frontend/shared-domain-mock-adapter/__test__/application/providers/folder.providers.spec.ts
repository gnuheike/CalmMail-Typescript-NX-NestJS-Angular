import { ClassProvider } from '@angular/core';
import { MOCK_FOLDER_PROVIDERS } from '../../../application/providers/folder.providers';
import { CreateFolderUseCase, GetFolderStatsUseCase, GetFoldersUseCase } from '@calm-mail/shared-domain';
import { MockCreateFolderUseCase, MockGetFolderStatsUseCase, MockGetFoldersUseCase } from '../../../infrastructure/adapter/mock-folder.use-cases';

describe('Folder Providers', () => {
  it('should provide MockGetFoldersUseCase for GetFoldersUseCase', () => {
    const provider = MOCK_FOLDER_PROVIDERS.find((p) => (p as ClassProvider).provide === GetFoldersUseCase) as ClassProvider;

    expect(provider).toBeDefined();
    expect(provider.useClass).toBe(MockGetFoldersUseCase);
  });

  it('should provide MockGetFolderStatsUseCase for GetFolderStatsUseCase', () => {
    const provider = MOCK_FOLDER_PROVIDERS.find((p) => (p as ClassProvider).provide === GetFolderStatsUseCase) as ClassProvider;

    expect(provider).toBeDefined();
    expect(provider.useClass).toBe(MockGetFolderStatsUseCase);
  });

  it('should provide MockCreateFolderUseCase for CreateFolderUseCase', () => {
    const provider = MOCK_FOLDER_PROVIDERS.find((p) => (p as ClassProvider).provide === CreateFolderUseCase) as ClassProvider;

    expect(provider).toBeDefined();
    expect(provider.useClass).toBe(MockCreateFolderUseCase);
  });

  it('should contain exactly 3 providers', () => {
    expect(MOCK_FOLDER_PROVIDERS.length).toBe(3);
  });
});
