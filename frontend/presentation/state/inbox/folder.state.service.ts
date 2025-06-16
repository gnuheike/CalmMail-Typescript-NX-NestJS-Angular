import { DestroyRef, inject, Injectable } from '@angular/core';
import { AsyncStore } from './async.store';
import { FolderGateway } from '@calm-mail/frontend-application';
import { FolderVm, mapToFolderVms } from '../../model';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';

@Injectable()
export class FolderStateService extends AsyncStore<FolderVm[]> {
    private readonly api: FolderGateway = inject(FolderGateway);
    private readonly destroyRef = inject(DestroyRef, { optional: true });

    constructor() {
        super();
        this.loadFolders(); // eager load
    }

    /* ------------ actions ------------ */
    loadFolders(): void {
        this.setLoading();

        const observable = this.api.getFolders();

        // Only use takeUntilDestroyed if destroyRef is available (not in tests)
        (this.destroyRef 
            ? observable.pipe(takeUntilDestroyed(this.destroyRef))
            : observable)
            .subscribe({
                next: (r) => {
                    const mapped = mapToFolderVms(r.folders);
                    this.setData(mapped);
                },
                error: (e) => this.setError(e),
            });
    }
}
