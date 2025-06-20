import { Component, input } from '@angular/core';
import { IonicModule } from '@ionic/angular';
import { CommonModule } from '@angular/common';
import { FormatEmailDatePipe } from '@calm-mail/frontend-shared';
import { EmailVm } from '../../model/email/email.vm';

@Component({
    selector: 'lib-email-list',
    standalone: true,
    imports: [IonicModule, CommonModule, FormatEmailDatePipe],
    templateUrl: './email-list.component.html',
    styleUrl: './email-list.component.css',
})
export class EmailListComponent {
    readonly emails = input.required<EmailVm[]>();
}
