import { Injectable, inject } from '@angular/core';
import {
  CreateFolderRequest,
  CreateFolderResponse,
  Folder,
  GetFoldersRequest,
  GetFoldersResponse,
  GetFolderStatsRequest,
  GetFolderStatsResponse
} from '@calm-mail/contract';
import { CreateFolderUseCase, GetFolderStatsUseCase, GetFoldersUseCase } from '@calm-mail/shared-domain';
import { MockFolderStateService } from '../state/mock-folder-state.service';
import { simulateNetworkRequest } from '../util/simulation.util';

/**
 * Mock implementation of GetFoldersUseCase
 *
 * Retrieves folders from the mock state service with optional filtering
 */
@Injectable()
export class MockGetFoldersUseCase extends GetFoldersUseCase {
  private readonly folderStateService = inject(MockFolderStateService);

  constructor() {
    super();
  }

  /**
   * Execute the use case to get folders
   * @param input Optional request parameters for filtering
   * @returns Promise resolving to a GetFoldersResponse
   */
  async execute(input?: GetFoldersRequest): Promise<GetFoldersResponse> {
    return simulateNetworkRequest(() => {
      const includeEmpty = input?.includeEmpty ?? true;
      const includeCustom = input?.includeCustom ?? true;

      const folders = this.folderStateService.getFolders(includeEmpty, includeCustom);

      return {
        folders,
      };
    });
  }
}

/**
 * Mock implementation of GetFolderStatsUseCase
 *
 * Retrieves statistics for a specific folder from the mock state service
 */
@Injectable()
export class MockGetFolderStatsUseCase extends GetFolderStatsUseCase {
  private readonly folderStateService = inject(MockFolderStateService);

  constructor() {
    super();
  }

  /**
   * Execute the use case to get folder statistics
   * @param input Request parameters containing the folder ID
   * @returns Promise resolving to a GetFolderStatsResponse
   */
  async execute(input: GetFolderStatsRequest): Promise<GetFolderStatsResponse> {
    return simulateNetworkRequest(() => {
      const folder = this.folderStateService.getFolderById(input.folderId);

      if (!folder) {
        throw new Error(`Folder with ID ${input.folderId} not found`);
      }

      return {
        stats: {
          folderId: folder.id,
          unreadCount: folder.unreadCount,
          totalCount: folder.totalCount,
          lastUpdated: new Date(),
          sizeInBytes: Math.floor(Math.random() * 1000000), // Random size for simulation
        },
      };
    });
  }
}

/**
 * Mock implementation of CreateFolderUseCase
 *
 * Creates a new folder in the mock state service
 */
@Injectable()
export class MockCreateFolderUseCase extends CreateFolderUseCase {
  private readonly folderStateService = inject(MockFolderStateService);

  constructor() {
    super();
  }

  /**
   * Execute the use case to create a new folder
   * @param input Request parameters for creating a folder
   * @returns Promise resolving to a CreateFolderResponse
   */
  async execute(input: CreateFolderRequest): Promise<CreateFolderResponse> {
    return simulateNetworkRequest(() => {
      // Check if parent folder exists if parentId is provided
      if (input.parentId) {
        const parentFolder = this.folderStateService.getFolderById(input.parentId);
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

      // Add the folder to the state
      const createdFolder = this.folderStateService.addCustomFolder(newFolder);

      return {
        folder: createdFolder,
      };
    });
  }
}
