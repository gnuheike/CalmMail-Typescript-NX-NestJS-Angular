import { GetFoldersRequest, GetFoldersResponse } from '@calm-mail/contract';

/**
 * Get Folders Use Case
 *
 * Abstract class defining the contract for retrieving folders.
 * Implementations will handle the actual retrieval of folders from the data source.
 */
export abstract class GetFoldersUseCase {
  abstract execute(input?: GetFoldersRequest): Promise<GetFoldersResponse>;
}
