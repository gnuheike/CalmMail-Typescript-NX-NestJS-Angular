import { Component, input } from '@angular/core';
import { IonicModule } from '@ionic/angular';
import { CommonModule } from '@angular/common';
import { EmailVm } from '../../model';
import { FormatEmailDatePipe } from '../../pipe/format-email-date.pipe';

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
