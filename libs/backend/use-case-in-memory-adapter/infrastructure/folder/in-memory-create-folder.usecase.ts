import { Injectable } from '@nestjs/common';
import { CreateFolderUseCase } from '@calm-mail/backend-domain';
import { CreateFolderRequest, CreateFolderResponse, Folder } from '@calm-mail/contract';
import { InMemoryGetFoldersUseCase } from './in-memory-get-folders.usecase';

/**
 * In-memory implementation of CreateFolderUseCase
 * 
 * This class provides a mock implementation of the CreateFolderUseCase
 * using the mock data from the contract package.
 */
@Injectable()
export class InMemoryCreateFolderUseCase extends CreateFolderUseCase {
  constructor(private readonly getFoldersUseCase: InMemoryGetFoldersUseCase) {
    super();
  }

  /**
   * Execute the create folder use case
   * 
   * @param input Request with folder creation details
   * @returns Promise with the created folder response
   */
  async execute(input: CreateFolderRequest): Promise<CreateFolderResponse> {
    // Check if parent folder exists if parentId is provided
    if (input.parentId) {
      const foldersResponse = await this.getFoldersUseCase.execute();
      const parentFolder = foldersResponse.folders.find(f => f.id === input.parentId);
      
      if (!parentFolder) {
        throw new Error(`Parent folder with ID ${input.parentId} not found`);
      }
    }
    
    // Create a new folder with generated ID and default values
    const newFolder: Folder = {
      id: `clq${Date.now().toString(36)}${Math.random().toString(36).substring(2, 7)}`,
      name: 'custom',
      displayName: input.displayName,
      unreadCount: 0,
      totalCount: 0,
      icon: 'folder', // Default icon
      isDefault: false,
      parentId: input.parentId,
    };
    
    // Add the folder to the in-memory store
    // In a real implementation, we would persist this folder
    // For this mock implementation, we'll just return the created folder
    
    // Return the created folder
    return {
      folder: newFolder
    };
  }
}
