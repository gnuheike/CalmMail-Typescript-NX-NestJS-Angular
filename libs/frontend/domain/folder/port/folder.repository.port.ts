import { FolderEntity } from '../entity/folder.entity';

export abstract class FolderRepositoryPort {
    /**
     * Get all folders
     *
     * @returns Observable with the folders response
     */
    abstract getFolders(): Promise<FolderEntity[]>;
}
