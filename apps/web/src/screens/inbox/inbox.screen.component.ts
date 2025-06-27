import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { InboxLeftPaneComponent } from './inbox-left-pane/inbox-left-pane.component';
import { InboxRightPaneComponent } from './inbox-right-pane/inbox-right-pane.component';
import { InboxFacade } from '@calm-mail/frontend-application';

@Component({
    selector: 'app-inbox',
    imports: [CommonModule, IonicModule, InboxLeftPaneComponent, InboxRightPaneComponent],
    templateUrl: './inbox.screen.component.html',
    styleUrl: './inbox.screen.component.scss',
    providers: [],
})
export class InboxScreenComponent {
    protected readonly inboxFacade = inject(InboxFacade);

    constructor() {
        // Initialize the inbox view, which will select the default folder
        this.inboxFacade.initializeView();
    }
}
