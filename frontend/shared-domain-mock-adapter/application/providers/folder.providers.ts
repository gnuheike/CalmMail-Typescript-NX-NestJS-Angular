import { Provider } from '@angular/core';
import { CreateFolderUseCase, GetFolderStatsUseCase, GetFoldersUseCase } from '@calm-mail/shared-domain';
import {
  MockCreateFolderUseCase,
  MockGetFolderStatsUseCase,
  MockGetFoldersUseCase
} from '../../infrastructure/adapter/mock-folder.use-cases';

/**
 * Provider configuration for mock folder use cases
 *
 * This array maps the abstract use cases from @calm-mail/domain
 * to their mock implementations in this library.
 *
 * Include this provider array in your application's providers
 * to use the mock implementations instead of the real ones.
 *
 * Example usage in app.config.ts:
 * ```
 * export const appConfig: ApplicationConfig = {
 *   providers: [
 *     // ... other providers
 *     ...MOCK_FOLDER_PROVIDERS
 *   ]
 * };
 * ```
 */
export const MOCK_FOLDER_PROVIDERS: Provider[] = [
  {
    provide: GetFoldersUseCase,
    useClass: MockGetFoldersUseCase,
  },
  {
    provide: GetFolderStatsUseCase,
    useClass: MockGetFolderStatsUseCase,
  },
  {
    provide: CreateFolderUseCase,
    useClass: MockCreateFolderUseCase,
  },
];
