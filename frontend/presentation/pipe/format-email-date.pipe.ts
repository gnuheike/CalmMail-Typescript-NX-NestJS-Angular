import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
    name: 'formatEmailDate',
    standalone: true,
})
export class FormatEmailDatePipe implements PipeTransform {
    transform(date: Date | string): string {
        const now = new Date();
        const emailDate = new Date(date);

        if (emailDate.toDateString() === now.toDateString()) {
            return emailDate.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
        }
        if (emailDate.getFullYear() === now.getFullYear()) {
            return emailDate.toLocaleDateString([], { month: 'short', day: 'numeric' });
        }
        return emailDate.toLocaleDateString();
    }
}
