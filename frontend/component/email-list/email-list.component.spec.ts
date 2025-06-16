import { ComponentFixture, TestBed } from '@angular/core/testing';
import { EmailListComponent } from './email-list.component';
import { EmailVm, EmailId } from '@calm-mail/frontend-presentation';
import { CommonModule } from '@angular/common';
import { FormatEmailDatePipe } from '../pipe';

// Create a mock IonicModule
const MockIonicModule = {
  ngModule: class IonicModule {}
};

describe('EmailListComponent', () => {
  let component: EmailListComponent;
  let fixture: ComponentFixture<EmailListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EmailListComponent, CommonModule, FormatEmailDatePipe],
      providers: [
        { provide: 'IonicModule', useValue: MockIonicModule }
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(EmailListComponent);
    component = fixture.componentInstance;

    // Create a mock EmailVm array
    const mockEmails: EmailVm[] = [
      {
        id: EmailId.fromString('1'),
        subject: 'Test Email 1',
        from: 'sender1@example.com',
        body: 'This is a test email body',
        preview: 'This is a test email body',
        processedAt: new Date(),
        read: false
      }
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
