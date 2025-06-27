import { FolderEntity } from '../entity/folder.entity';

export abstract class FolderIconsProviderPort {
    abstract getFolderIcon(folder: FolderEntity): string;
}
