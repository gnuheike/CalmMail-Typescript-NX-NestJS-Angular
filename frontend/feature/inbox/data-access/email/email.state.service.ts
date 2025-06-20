import { inject, Injectable, signal } from '@angular/core';

import { EmailGateway } from '@calm-mail/frontend/core-ports';
import { catchError, tap } from 'rxjs/operators';
import { AsyncStore } from '@calm-mail/frontend/shared';
import { EmailVm, mapToEmailVms } from '../../model/email/email.vm';
import { FolderId, FolderVm } from '../../model/folder/folder.vm';

@Injectable()
export class EmailStateService extends AsyncStore<EmailVm[]> {
    /* -------- core state -------- */
    public readonly selectedFolder = signal<FolderVm | undefined>(undefined);
    private readonly api: EmailGateway = inject(EmailGateway);

    /* -------- actions -------- */
    public loadEmailsForFolder(folderId: FolderId): void {
        this.setLoading();
        this.api
            .getEmails({ folderId: folderId.toString(), limit: 100, page: 1 })
            .pipe(
                tap((r) => {
                    const mapped = mapToEmailVms(r.emails);
                    this.setData(mapped);
                }),
                catchError((e) => {
                    this.setError(e);
                    throw e;
                }),
            )
            .subscribe();
    }

    public selectFolder(folder: FolderVm): void {
        this.selectedFolder.set(folder);
    }
}
