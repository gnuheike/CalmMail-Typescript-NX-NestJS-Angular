import { Injectable } from '@nestjs/common';
import { GetFoldersUseCase } from '@calm-mail/backend-domain';
import { GetFoldersRequest, GetFoldersResponse, createDefaultFolders, createMockCustomFolder } from '@calm-mail/contract';

/**
 * In-memory implementation of GetFoldersUseCase
 * 
 * This class provides a mock implementation of the GetFoldersUseCase
 * using the mock data from the contract package.
 */
@Injectable()
export class InMemoryGetFoldersUseCase extends GetFoldersUseCase {
  // Store folders in memory
  private readonly folders = [
    ...createDefaultFolders(),
    // Add some custom folders
    createMockCustomFolder({ 
      id: 'clq5678901234abcdefghijklm',
      displayName: 'Work',
      icon: 'briefcase'
    }),
    createMockCustomFolder({ 
      id: 'clq6789012345abcdefghijklm',
      displayName: 'Family',
      icon: 'people'
    }),
    createMockCustomFolder({ 
      id: 'clq7890123456abcdefghijklm',
      displayName: 'Finance',
      icon: 'cash'
    }),
    createMockCustomFolder({ 
      id: 'clq8901234567abcdefghijklm',
      displayName: 'Travel',
      icon: 'airplane'
    }),
    createMockCustomFolder({ 
      id: 'clq9012345678abcdefghijklm',
      displayName: 'Archive',
      icon: 'archive',
      parentId: 'clq5678901234abcdefghijklm' // Nested under Work folder
    }),
  ];

  /**
   * Execute the get folders use case
   * 
   * @param input Request with filtering options
   * @returns Promise with the folders response
   */
  async execute(input?: GetFoldersRequest): Promise<GetFoldersResponse> {
    // Apply filters if provided
    let filteredFolders = [...this.folders];

    if (input) {
      // Filter out empty folders if requested
      if (input.includeEmpty === false) {
        filteredFolders = filteredFolders.filter(folder => folder.totalCount > 0);
      }

      // Filter out custom folders if requested
      if (input.includeCustom === false) {
        filteredFolders = filteredFolders.filter(folder => folder.isDefault);
      }
    }

    return {
      folders: filteredFolders
    };
  }
}
