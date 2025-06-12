import { Injectable } from '@angular/core';
import { Folder } from '@calm-mail/contract';
import { MOCK_FOLDERS_INITIAL_STATE } from '@calm-mail/shared-contract-mocks';
import { BehaviorSubject } from 'rxjs';

/**
 * Mock Folder State Service
 *
 * A stateful service that manages the in-memory folder list for mock implementations.
 * It provides methods to query and manipulate the folder state.
 */
@Injectable({
  providedIn: 'root',
})
export class MockFolderStateService {
  /**
   * Subject containing the current folder list
   * @private
   */
  private readonly foldersSubject = new BehaviorSubject<Folder[]>([...MOCK_FOLDERS_INITIAL_STATE]);

  /**
   * Get the current folder list
   */
  public get folders(): Folder[] {
    return this.foldersSubject.getValue();
  }

  /**
   * Get a folder by its ID
   * @param id The folder ID
   * @returns The folder or undefined if not found
   */
  public getFolderById(id: string): Folder | undefined {
    return this.folders.find((folder) => folder.id === id);
  }

  /**
   * Add a custom folder to the state
   * @param folder The folder to add
   * @returns The added folder
   */
  public addCustomFolder(folder: Folder): Folder {
    const newFolders = [...this.folders, folder];
    this.foldersSubject.next(newFolders);
    return folder;
  }
  
  /**
   * Get folders with optional filtering
   * @param includeEmpty Whether to include folders with no emails (totalCount = 0)
   * @param includeCustom Whether to include custom (user-created) folders
   * @returns Filtered list of folders
   */
  public getFolders(includeEmpty = true, includeCustom = true): Folder[] {
    return this.folders.filter((folder) => {
      // Filter by empty status if needed
      if (!includeEmpty && folder.totalCount === 0) {
        return false;
      }

      // Filter by custom status if needed
      return !(!includeCustom && !folder.isDefault);
    });
  }
}
