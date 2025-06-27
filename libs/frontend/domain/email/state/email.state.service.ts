import { inject, Injectable, signal } from '@angular/core';
import { EmailEntity } from '../entity/email.entity';
import { FolderEntity, FolderId } from '../../folder';
import { EmailRepositoryPort } from '../port/email.repository.port';
import { createAsyncState } from '../../store/create-async-state';
import { LoggerPort } from '../../logger';

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
