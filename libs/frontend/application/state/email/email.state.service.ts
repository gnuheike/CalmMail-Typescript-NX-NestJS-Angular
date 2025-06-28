import { inject, Injectable, signal } from '@angular/core';
import { createAsyncState, LoggerPort } from '@calm-mail/frontend-shared';
import { EmailEntity, EmailRepositoryPort, FolderEntity, FolderId } from '@calm-mail/frontend-domain';

@Injectable({
    providedIn: 'root',
})
export class EmailStateService {
    // Keep the existing selectedFolder signal
    public readonly selectedFolder = signal<FolderEntity | undefined>(undefined);

    private readonly api: EmailRepositoryPort = inject(EmailRepositoryPort);
    private readonly logger = inject(LoggerPort);

    // Create async state using the new utility
    private readonly asyncState = createAsyncState<EmailEntity[]>();

    // Expose computed signals for consumers
    readonly data = this.asyncState.data;
    readonly loading = this.asyncState.loading;
    readonly error = this.asyncState.error;

    public async loadEmailsForFolder(folderId: FolderId): Promise<void> {
        this.asyncState.setLoading(true);
        try {
            const emails = await this.api.getEmails({ folderId: folderId.toString(), limit: 100, page: 1 });
            this.asyncState.setData(emails);
        } catch (error) {
            this.asyncState.setError(error, this.logger);
        } finally {
            this.asyncState.setLoading(false);
        }
    }

    public selectFolder(folder: FolderEntity): void {
        this.selectedFolder.set(folder);
    }
}
