import { GetFolderStatsRequest, GetFolderStatsResponse } from '@calm-mail/contract';

/**
 * Get Folder Stats Use Case
 *
 * Abstract class defining the contract for retrieving statistics for a specific folder.
 * Implementations will handle the actual retrieval of folder statistics from the data source.
 */
export abstract class GetFolderStatsUseCase {
  abstract execute(input: GetFolderStatsRequest): Promise<GetFolderStatsResponse>;
}
