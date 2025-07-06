import { Component, input, output } from '@angular/core';
import { IonicModule } from '@ionic/angular';
import { CommonModule } from '@angular/common';
import { EmailEntity } from '@calm-mail/frontend-domain';
import { FormatEmailDatePipe } from '../pipe';

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
