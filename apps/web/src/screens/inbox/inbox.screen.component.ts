import { Component, computed, effect, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { EmailListComponent, FolderListComponent, inboxFacadeProvider, InboxStateFacade } from '@calm-mail/frontend-presentation';

@Component({
    selector: 'app-inbox',
    imports: [CommonModule, IonicModule, FolderListComponent, EmailListComponent],
    templateUrl: './inbox.screen.component.html',
    styleUrl: './inbox.screen.component.scss',
    providers: [inboxFacadeProvider()],
})
export class InboxScreenComponent {
    private readonly inboxState = inject(InboxStateFacade);

    // Data signals with fallback to empty arrays
    protected readonly folders$ = computed(() => this.inboxState.folders$() || []);
    protected readonly emails$ = computed(() => this.inboxState.emails$() || []);
    protected readonly selectedFolder$ = this.inboxState.selectedFolder$;

    // Loading and error state signals
    protected readonly foldersLoading$ = this.inboxState.foldersLoading$;
    protected readonly foldersError$ = this.inboxState.foldersError$;
    protected readonly emailsLoading$ = this.inboxState.emailsLoading$;
    protected readonly emailsError$ = this.inboxState.emailsError$;

    // Global loading indicator
    protected readonly anyLoading$ = this.inboxState.anyLoading$;

    //
    protected readonly selectFolder = this.inboxState.selectFolder.bind(this.inboxState);

    constructor() {
        // Explicitly orchestrate the initial data load flow
        effect(() => {
            const folders = this.inboxState.folders$();
            // Check if folders have loaded and emails haven't been requested yet
            if (folders && folders.length > 0 && !this.inboxState.emails$() && !this.inboxState.emailsLoading$()) {
                const inbox = folders.find((f) => f.name === 'inbox');
                if (inbox) {
                    this.inboxState.selectFolder(inbox);
                }
            }
        });
    }
}
