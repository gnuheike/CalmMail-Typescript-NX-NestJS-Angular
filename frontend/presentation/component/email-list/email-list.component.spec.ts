import { ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';
import { EmailListComponent } from './email-list.component';
import { Email } from '@calm-mail/contract';

describe('EmailList', () => {
  let component: EmailListComponent;
  let fixture: ComponentFixture<EmailListComponent>;

  // Mock email data
  const mockEmails: Email[] = [
    {
      id: '1',
      subject: 'Test Email 1',
      from: 'sender1@example.com',
      to: ['recipient1@example.com'],
      cc: [],
      bcc: [],
      body: 'This is a test email body',
      processedAt: new Date(),
      read: false,
      isDraft: false,
      folderId: 'inbox',
    },
    {
      id: '2',
      subject: 'Test Email 2',
      from: 'sender2@example.com',
      to: ['recipient2@example.com'],
      cc: [],
      bcc: [],
      body: 'This is another test email body',
      processedAt: new Date(),
      read: true,
      isDraft: false,
      folderId: 'inbox',
    }
  ];

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EmailListComponent, IonicModule.forRoot()],
    }).compileComponents();

    fixture = TestBed.createComponent(EmailListComponent);
    component = fixture.componentInstance;

    // Set the required input property
    component.emails.set(mockEmails);

    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should display the correct number of emails', () => {
    const emailItems = fixture.nativeElement.querySelectorAll('.email-item');
    expect(emailItems.length).toBe(2);
  });

  it('should format dates correctly', () => {
    const today = new Date();
    const formattedToday = component.formatDate(today);
    expect(formattedToday).toContain(':'); // Time format should contain a colon

    const lastYear = new Date();
    lastYear.setFullYear(lastYear.getFullYear() - 1);
    const formattedLastYear = component.formatDate(lastYear);
    expect(formattedLastYear).toContain(lastYear.getFullYear().toString());
  });
});
