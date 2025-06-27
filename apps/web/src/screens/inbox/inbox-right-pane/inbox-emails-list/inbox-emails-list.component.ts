import { Component, input, output } from '@angular/core';
import { IonButtons, IonContent, IonHeader, IonMenuButton, IonProgressBar, IonTitle, IonToolbar } from '@ionic/angular/standalone';
import { EmailListComponent } from '@calm-mail/frontend-ui';
import { EmailEntity, FolderEntity } from '@calm-mail/frontend-domain';

@Component({
    selector: 'app-inbox-emails-list',
    imports: [IonHeader, IonContent, IonToolbar, IonMenuButton, IonButtons, IonTitle, EmailListComponent, IonProgressBar],
    templateUrl: './inbox-emails-list.component.html',
    styleUrl: './inbox-emails-list.component.scss',
})
export class InboxEmailsListComponent {
    readonly emailSelectedEmitterRef = output<EmailEntity>();
    readonly emailsLoading$ = input<boolean>(false);
    readonly selectedFolder$ = input<FolderEntity | undefined>(undefined);
    readonly emailsError$ = input<string | null>(null);
    readonly emails$ = input<EmailEntity[]>([]);
}
