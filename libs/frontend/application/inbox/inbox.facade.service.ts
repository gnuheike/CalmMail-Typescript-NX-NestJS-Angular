import { effect, inject, Injectable } from '@angular/core';
import { EmailStateService, FolderEntity, FolderStateService } from '@calm-mail/frontend-domain';
import { SelectFolderCommandHandler } from './commands/select-folder/select-folder.command-handler';
import { SelectFolderCommand } from './commands/select-folder/select-folder.command';

@Injectable()
export class InboxFacade {
    private readonly folders = inject(FolderStateService);
    readonly foldersLoading$ = this.folders.loading;
    readonly foldersError$ = this.folders.error;
    readonly folders$ = this.folders.data;

    private readonly emails = inject(EmailStateService);
    readonly emailsLoading$ = this.emails.loading;
    readonly emailsError$ = this.emails.error;
    readonly emails$ = this.emails.data;
    readonly selectedFolder$ = this.emails.selectedFolder;

    private readonly selectFolderCommandHandler = inject(SelectFolderCommandHandler);

    constructor() {
        this.folders.loadFolders().then();
    }

    /**
     * Initializes the inbox view by selecting the default folder
     * This method should be called when the inbox screen is loaded
     */
    initializeView(): void {
        effect(() => {
            const folders = this.folders$();
            if (!folders) {
                return;
            }

            const inbox = folders.find((f) => f.name === 'inbox');
            if (inbox) {
                this.selectFolder(inbox);
            }
        });
    }

    selectFolder(folder: FolderEntity): void {
        const command = new SelectFolderCommand({ folder });
        this.selectFolderCommandHandler.execute(command).then();
    }
}
