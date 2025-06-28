import { inject, Injectable } from '@angular/core';
import { createAsyncState, LoggerPort } from '@calm-mail/frontend-shared';
import { FolderEntity, FolderRepositoryPort } from '@calm-mail/frontend-domain';

@Injectable({
    providedIn: 'root',
})
export class FolderStateService {
    private readonly api = inject(FolderRepositoryPort);
    private readonly logger = inject(LoggerPort);

    // Create async state using the new utility
    private readonly asyncState = createAsyncState<FolderEntity[]>();

    // Expose computed signals for consumers
    readonly data = this.asyncState.data;
    readonly loading = this.asyncState.loading;
    readonly error = this.asyncState.error;

    async loadFolders(): Promise<void> {
        this.asyncState.setLoading(true);
        try {
            const folders = await this.api.getFolders();
            this.asyncState.setData(folders);
        } catch (e) {
            this.asyncState.setError(e, this.logger);
        } finally {
            this.asyncState.setLoading(false);
        }
    }
}
