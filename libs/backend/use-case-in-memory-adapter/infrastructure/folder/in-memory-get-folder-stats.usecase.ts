import { Injectable } from '@nestjs/common';
import { GetFolderStatsUseCase } from '@calm-mail/backend-domain';
import { GetFolderStatsRequest, GetFolderStatsResponse } from '@calm-mail/contract';
import { InMemoryGetFoldersUseCase } from './in-memory-get-folders.usecase';

/**
 * In-memory implementation of GetFolderStatsUseCase
 * 
 * This class provides a mock implementation of the GetFolderStatsUseCase
 * using the mock data from the contract package.
 */
@Injectable()
export class InMemoryGetFolderStatsUseCase extends GetFolderStatsUseCase {
  constructor(private readonly getFoldersUseCase: InMemoryGetFoldersUseCase) {
    super();
  }

  /**
   * Execute the get folder stats use case
   * 
   * @param input Request with folder ID
   * @returns Promise with the folder stats response
   */
  async execute(input: GetFolderStatsRequest): Promise<GetFolderStatsResponse> {
    // Get all folders
    const foldersResponse = await this.getFoldersUseCase.execute();
    
    // Find the requested folder
    const folder = foldersResponse.folders.find(f => f.id === input.folderId);
    
    // If folder not found, throw an error
    if (!folder) {
      throw new Error(`Folder with ID ${input.folderId} not found`);
    }
    
    // Return stats for the folder
    return {
      stats: {
        folderId: folder.id,
        unreadCount: folder.unreadCount,
        totalCount: folder.totalCount,
        lastUpdated: new Date(),
        sizeInBytes: Math.floor(Math.random() * 1000000), // Random size for simulation
      }
    };
  }
}
