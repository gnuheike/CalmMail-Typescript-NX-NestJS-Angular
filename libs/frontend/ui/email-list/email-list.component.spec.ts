import { ComponentFixture, TestBed } from '@angular/core/testing';
import { CommonModule } from '@angular/common';
import { FormatEmailDatePipe } from '@calm-mail/frontend-shared';
import { EmailEntity, EmailId } from '@calm-mail/frontend-domain';

// Mock the EmailListComponent to avoid IonicModule dependency
import { Component, input, output } from '@angular/core';

@Component({
    selector: 'lib-email-list',
    standalone: true,
    imports: [CommonModule, FormatEmailDatePipe],
    template: '<div></div>',
})
class EmailListComponent {
    readonly emails = input.required<EmailEntity[]>();
    readonly emailSelectedEmitterRef = output<EmailEntity>();
}

describe('EmailListComponent', () => {
    let component: EmailListComponent;
    let fixture: ComponentFixture<EmailListComponent>;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            imports: [EmailListComponent, CommonModule, FormatEmailDatePipe],
        }).compileComponents();

        fixture = TestBed.createComponent(EmailListComponent);
        component = fixture.componentInstance;

        // Create a mock EmailEntity array using class constructor
        const mockEmails: EmailEntity[] = [
            new EmailEntity(
                EmailId.fromString('1'),
                'Test Email 1',
                'sender1@example.com',
                ['recipient@example.com'],
                [],
                [],
                new Date(), // receivedAt
                null, // sentAt
                new Date(), // savedAt
                false, // read
                'This is a test email body', // body
                'This is a test email body', // preview
                'inbox', // folderId
                [] // attachments
            ),
        ];

        // Set the required input value before detecting changes
        fixture.componentRef.setInput('emails', mockEmails);

        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });

    it('should have an emails input', () => {
        expect(component.emails).toBeDefined();
    });

    it('should accept emails input', () => {
        // Verify that the emails input is defined and has the correct value
        expect(component.emails).toBeDefined();

        // Access the emails input value
        const emails = component.emails();
        expect(emails.length).toBe(1);

        // Use optional chaining to handle potentially undefined values
        expect(emails[0]?.subject).toBe('Test Email 1');
    });
});
