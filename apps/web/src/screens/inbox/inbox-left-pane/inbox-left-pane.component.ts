import { Component, inject, input, output } from '@angular/core';
import { FolderListComponent } from '@calm-mail/frontend-ui';
import { IonicModule } from '@ionic/angular';
import { Router } from '@angular/router';
import { FolderEntity } from '@calm-mail/frontend-domain';

@Component({
    selector: 'app-inbox-left-pane',
    imports: [FolderListComponent, IonicModule],
    templateUrl: './inbox-left-pane.component.html',
    styleUrl: './inbox-left-pane.component.css',
})
export class InboxLeftPaneComponent {
    readonly folderSelectedEmitterRef = output<FolderEntity>();
    readonly folders$ = input<FolderEntity[]>([]);
    readonly foldersLoading$ = input<boolean>(false);
    readonly foldersError$ = input<string | null>(null);

    private readonly router = inject(Router);

    onNewMessageClick(): Promise<boolean> {
        return this.router.navigate(['/compose-email']);
    }
}
