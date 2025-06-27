import { Injectable } from '@angular/core';
import { simulateNetworkRequestPromise } from '../../../util/simulation.util';
import { FolderEntity, FolderRepositoryPort } from '@calm-mail/frontend-domain';
import { mapToFolderVms } from '../../mapper/folder.mapper';
import { mockFolders } from '@calm-mail/contract';

/**
 * Mock implementation of HttpFolderGateway
 *
 * Provides mock implementations of folder-related gateway methods
 * for development and testing purposes.
 */
@Injectable()
export class InMemoryFolderRepositoryAdapter extends FolderRepositoryPort {
    private readonly folders = mapToFolderVms(mockFolders);

    /**
     * Constructor initializes the folders using the factory functions
     */
    constructor() {
        super();
    }

    /**
     * Get all folders
     *
     * @returns Observable with the folders response
     */
    getFolders(): Promise<FolderEntity[]> {
        return simulateNetworkRequestPromise(() => {
            return this.folders;
        });
    }
}
