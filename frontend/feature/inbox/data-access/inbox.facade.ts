import { computed, inject, Injectable } from '@angular/core';
import { FolderStateService } from './folder/folder.state.service';
import { EmailStateService } from './email/email.state.service';
import { FolderVm } from '../model/folder/folder.vm';

@Injectable()
export class InboxStateFacade {
    /**
     *
     * @private
     */
    private readonly folders = inject(FolderStateService);
    readonly foldersLoading$ = this.folders.loading;
    readonly foldersError$ = this.folders.error;

    readonly folders$ = this.folders.data;
    /**
     *
     * @private
     */
    private readonly emails = inject(EmailStateService);
    readonly emailsLoading$ = this.emails.loading;
    readonly emailsError$ = this.emails.error;
    readonly emails$ = this.emails.data;
    readonly selectedFolder$ = this.emails.selectedFolder;

    readonly anyLoading$ = computed(() => this.folders.loading() || this.emails.loading());

    /* -------------- actions -------------- */
    selectFolder(folder: FolderVm): void {
        this.emails.selectFolder(folder);
        this.emails.loadEmailsForFolder(folder.id);
    }

    retryLoadFolders(): void {
        this.folders.loadFolders();
    }
}
