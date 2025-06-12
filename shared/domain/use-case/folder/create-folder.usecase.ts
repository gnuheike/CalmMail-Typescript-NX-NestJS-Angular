import { CreateFolderRequest, CreateFolderResponse } from '@calm-mail/contract';

/**
 * Create Folder Use Case
 *
 * Abstract class defining the contract for creating a new folder.
 * Implementations will handle the actual creation of folders in the data source.
 */
export abstract class CreateFolderUseCase {
  abstract execute(input: CreateFolderRequest): Promise<CreateFolderResponse>;
}
