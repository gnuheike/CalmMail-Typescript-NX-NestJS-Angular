import { CreateFolderRequest, CreateFolderResponse, GetFoldersResponse, GetFolderStatsRequest, GetFolderStatsResponse } from '@calm-mail/contract';
import { Observable } from 'rxjs';

export abstract class FolderGateway {
    /**
     * Get all folders
     *
     * @returns Observable with the folders response
     */
    abstract getFolders(): Observable<GetFoldersResponse>;

    /**
     * Get statistics for a specific folder
     *
     * @param input Request with folder ID
     * @returns Observable with the folder stats response
     */
    abstract getFolderStats(input: GetFolderStatsRequest): Observable<GetFolderStatsResponse>;

    /**
     * Create a new folder
     *
     * @param input Request with folder creation details
     * @returns Observable with the created folder response
     */
    abstract createFolder(input: CreateFolderRequest): Observable<CreateFolderResponse>;
}
