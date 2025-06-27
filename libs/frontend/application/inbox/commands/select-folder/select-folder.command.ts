import { Command } from '@calm-mail/shared-domain';
import { FolderEntity } from '@calm-mail/frontend-domain';

export const SELECT_FOLDER_COMMAND_TYPE = '[Inbox] Select Folder';

export class SelectFolderCommand extends Command<void> {
    readonly type = SELECT_FOLDER_COMMAND_TYPE;

    constructor(public readonly payload: { folder: FolderEntity }) {
        super();
    }
}
