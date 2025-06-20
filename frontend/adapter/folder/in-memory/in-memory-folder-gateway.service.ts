import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import {
    CreateFolderRequest,
    CreateFolderResponse,
    createMockFolder,
    Folder,
    GetFoldersResponse,
    GetFolderStatsRequest,
    GetFolderStatsResponse
} from '@calm-mail/contract';
import { FolderGateway } from '@calm-mail/frontend/core-ports';
import { simulateNetworkRequestObservable } from '../../util/simulation.util';

/**
 * Mock implementation of HttpFolderGateway
 *
 * Provides mock implementations of folder-related gateway methods
 * for development and testing purposes.
 */
@Injectable()
export class InMemoryFolderGateway extends FolderGateway {
    /**
     * Subject containing the current folder list
     * @private
     */
    private readonly foldersSubject = new BehaviorSubject<Folder[]>([]);

    /**
     * Constructor initializes the folders using the factory functions
     */
    constructor() {
        super();
        // Generate consistent mock data on initialization
        const folders = this.createInitialFolders();
        this.foldersSubject.next(folders);
    }

    /**
     * Get the current folder list
     */
    private get folders(): Folder[] {
        return this.foldersSubject.getValue();
    }

    /**
     * Get all folders
     *
     * @returns Observable with the folders response
     */
    getFolders(): Observable<GetFoldersResponse> {
        return simulateNetworkRequestObservable(() => {
            const folders = this.getFilteredFolders(true, true);

            return {
                folders,
            };
        });
    }

    /**
     * Get statistics for a specific folder
     *
     * @param input Request with folder ID
     * @returns Observable with the folder stats response
     */
    getFolderStats(input: GetFolderStatsRequest): Observable<GetFolderStatsResponse> {
        return simulateNetworkRequestObservable(() => {
            const folder = this.getFolderById(input.folderId);

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

    /**
     * Create a new folder
     *
     * @param input Request with folder creation details
     * @returns Observable with the created folder response
     */
    createFolder(input: CreateFolderRequest): Observable<CreateFolderResponse> {
        return simulateNetworkRequestObservable(() => {
            // Check if parent folder exists if parentId is provided
            if (input.parentId) {
                const parentFolder = this.getFolderById(input.parentId);
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
            const createdFolder = this.addCustomFolder(newFolder);

            return {
                folder: createdFolder,
            };
        });
    }

    /**
     * Creates the initial set of mock folders
     * @returns Array of mock folders
     * @private
     */
    private createInitialFolders(): Folder[] {
        return [
            // Default system folders
            this.createSystemFolder('clq1234567890inbox000000001', 'inbox', 'Inbox', 12, 45),
            this.createSystemFolder('clq1234567890sent0000000001', 'sent', 'Sent', 0, 23, 'send'),
            this.createSystemFolder('clq1234567890drafts00000001', 'drafts', 'Drafts', 0, 7),
            this.createSystemFolder('clq1234567890trash000000001', 'trash', 'Trash', 0, 15),

            // Custom folders
            this.createCustomFolder('clq1234567890work0000000001', 'Work', 3, 28, 'briefcase'),
            this.createCustomFolder('clq1234567890family00000001', 'Family', 1, 12, 'people'),
            this.createCustomFolder('clq1234567890finance0000001', 'Finance', 0, 18, 'cash'),
            this.createCustomFolder('clq1234567890travel00000001', 'Travel', 2, 9, 'airplane'),
            this.createCustomFolder('clq1234567890archive0000001', 'Archive', 0, 56, 'archive', 'clq1234567890work0000000001'),
        ];
    }

    /**
     * Helper method to create system folders
     */
    private createSystemFolder(
        id: string,
        name: 'inbox' | 'sent' | 'drafts' | 'trash',
        displayName: string,
        unreadCount: number,
        totalCount: number,
        icon?: string,
    ): Folder {
        return createMockFolder({
            id,
            name,
            displayName,
            unreadCount,
            totalCount,
            icon,
            isDefault: true,
        });
    }

    /**
     * Helper method to create custom folders
     */
    private createCustomFolder(id: string, displayName: string, unreadCount: number, totalCount: number, icon?: string, parentId?: string): Folder {
        return createMockFolder({
            id,
            name: 'custom',
            displayName,
            unreadCount,
            totalCount,
            icon,
            isDefault: false,
            parentId,
        });
    }

    /**
     * Get a folder by its ID
     * @param id The folder ID
     * @returns The folder or undefined if not found
     * @private
     */
    private getFolderById(id: string): Folder | undefined {
        return this.folders.find((folder) => folder.id === id);
    }

    /**
     * Add a custom folder to the state
     * @param folder The folder to add
     * @returns The added folder
     * @private
     */
    private addCustomFolder(folder: Folder): Folder {
        const newFolders = [...this.folders, folder];
        this.foldersSubject.next(newFolders);
        return folder;
    }

    /**
     * Get folders with optional filtering
     * @param includeEmpty Whether to include folders with no emails (totalCount = 0)
     * @param includeCustom Whether to include custom (user-created) folders
     * @returns Filtered list of folders
     * @private
     */
    private getFilteredFolders(includeEmpty = true, includeCustom = true): Folder[] {
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
