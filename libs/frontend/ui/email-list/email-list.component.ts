import { Component, input, output } from '@angular/core';
import { IonicModule } from '@ionic/angular';
import { CommonModule } from '@angular/common';
import { FormatEmailDatePipe } from '@calm-mail/frontend-shared';
import { EmailEntity } from '@calm-mail/frontend-domain';

@Component({
    selector: 'lib-email-list',
    standalone: true,
    imports: [IonicModule, CommonModule, FormatEmailDatePipe],
    templateUrl: './email-list.component.html',
    styleUrl: './email-list.component.css',
})
export class EmailListComponent {
    readonly emails = input.required<EmailEntity[]>();
    readonly emailSelectedEmitterRef = output<EmailEntity>();
}
