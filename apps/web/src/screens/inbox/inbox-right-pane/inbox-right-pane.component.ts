import { Component, effect, input, signal } from '@angular/core';
import { InboxEmailsListComponent } from './inbox-emails-list/inbox-emails-list.component';
import { InboxEmailViewComponent } from './inbox-email-view/inbox-email-view.component';
import { EmailEntity, FolderEntity } from '@calm-mail/frontend-domain';

@Component({
    selector: 'app-inbox-right-pane',
    imports: [InboxEmailsListComponent, InboxEmailViewComponent],
    templateUrl: './inbox-right-pane.component.html',
    styleUrl: './inbox-right-pane.component.css',
})
export class InboxRightPaneComponent {
    emailsLoading$ = input<boolean>(false);
    selectedFolder$ = input<FolderEntity | undefined>(undefined);
    emailsError$ = input<string | null>(null);
    emails$ = input<EmailEntity[]>([]);

    selectedEmail$ = signal<EmailEntity | undefined>(undefined);

    constructor() {
        effect(() => {
            const selectedFolder = this.selectedFolder$();
            console.log('InboxRightPaneComponent - effect, folder changed:', selectedFolder);
            this.selectedEmail$.set(undefined);
        });
    }
}
