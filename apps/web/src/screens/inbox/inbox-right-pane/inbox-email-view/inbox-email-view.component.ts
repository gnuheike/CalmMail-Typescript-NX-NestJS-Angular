import { Component, input, output } from '@angular/core';
import { DatePipe } from '@angular/common';
import { IonButton, IonButtons, IonContent, IonHeader, IonIcon, IonText, IonTitle, IonToolbar } from '@ionic/angular/standalone';
import { EmailEntity } from '@calm-mail/frontend-domain';

@Component({
    selector: 'app-inbox-email-view',
    imports: [DatePipe, IonButtons, IonContent, IonHeader, IonText, IonTitle, IonToolbar, IonIcon, IonButton],
    templateUrl: './inbox-email-view.component.html',
    styleUrl: './inbox-email-view.component.css',
})
export class InboxEmailViewComponent {
    readonly email$ = input.required<EmailEntity>();
    readonly emailSelectionClearEmitterRef = output<void>();
}
