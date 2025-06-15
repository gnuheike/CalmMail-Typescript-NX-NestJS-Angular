import { inject, Injectable } from '@angular/core';
import { AsyncStore } from './async.store';
import { FolderGateway } from '@calm-mail/frontend-application';
import { FolderVm, mapToFolderVms } from '../../model';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';

@Injectable()
export class FolderStateService extends AsyncStore<FolderVm[]> {
    private readonly api: FolderGateway = inject(FolderGateway);

    constructor() {
        super();
        this.loadFolders(); // eager load
    }

    /* ------------ actions ------------ */
    loadFolders(): void {
        this.setLoading();

        this.api
            .getFolders() // <- Observable
            .pipe(takeUntilDestroyed())
            .subscribe({
                next: (r) => {
                    const mapped = mapToFolderVms(r.folders);
                    this.setData(mapped);
                },
                error: (e) => this.setError(e),
            });
    }
}
