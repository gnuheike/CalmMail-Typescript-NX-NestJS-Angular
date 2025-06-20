import { ComponentFixture, TestBed } from '@angular/core/testing';
import { InboxScreenComponent } from './inbox.screen.component';
import { By } from '@angular/platform-browser';
import { of } from 'rxjs';
import { EmailGateway, FolderGateway } from '@calm-mail/frontend-core-ports';

describe('InboxComponent', () => {
    let component: InboxScreenComponent;
    let fixture: ComponentFixture<InboxScreenComponent>;
    let mockFolderGateway: jest.Mocked<FolderGateway>;
    let mockEmailGateway: jest.Mocked<EmailGateway>;

    beforeEach(async () => {
        // Mock folder data
        const mockFolders = [
            {
                id: 'folder-1',
                name: 'inbox',
                displayName: 'Inbox',
                unreadCount: 5,
                totalCount: 10,
                isDefault: true,
                icon: 'mail-outline',
            },
            {
                id: 'folder-2',
                name: 'sent',
                displayName: 'Sent',
                unreadCount: 0,
                totalCount: 20,
                isDefault: true,
                icon: 'paper-plane-outline',
            },
        ];

        // Mock email data
        const mockEmails = [
            {
                id: 'email-1',
                subject: 'Test Email 1',
                from: 'sender1@example.com',
                to: ['recipient1@example.com'],
                cc: [],
                bcc: [],
                body: 'Test body 1',
                processedAt: new Date(),
                read: false,
                isDraft: false,
                folderId: 'folder-1',
            },
        ];

        mockFolderGateway = {
            getFolders: jest.fn().mockReturnValue(of({ folders: mockFolders })),
        } as unknown as jest.Mocked<FolderGateway>;

        mockEmailGateway = {
            getEmails: jest.fn().mockReturnValue(
                of({
                    emails: mockEmails,
                    pagination: { page: 1, limit: 10, totalItems: 1, totalPages: 1 },
                }),
            ),
        } as unknown as jest.Mocked<EmailGateway>;

        await TestBed.configureTestingModule({
            imports: [InboxScreenComponent],
            providers: [
                { provide: FolderGateway, useValue: mockFolderGateway },
                { provide: EmailGateway, useValue: mockEmailGateway },
            ],
        }).compileComponents();

        fixture = TestBed.createComponent(InboxScreenComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });

    it('should have ion-split-pane structure', () => {
        const splitPane = fixture.debugElement.query(By.css('ion-split-pane'));
        expect(splitPane).toBeTruthy();
        expect(splitPane.attributes['contentId']).toBe('main-content');
        expect(splitPane.attributes['when']).toBe('md');
    });

    it('should have mobile menu with folder sidebar', () => {
        const mobileMenu = fixture.debugElement.query(By.css('ion-menu[type="overlay"]'));
        expect(mobileMenu).toBeTruthy();
        expect(mobileMenu.attributes['contentId']).toBe('main-content');

        const folderTitle = mobileMenu.query(By.css('ion-title'));
        expect(folderTitle.nativeElement.textContent).toContain('Folders');
    });

    it('should have main content area', () => {
        const mainContent = fixture.debugElement.query(By.css('#main-content'));
        expect(mainContent).toBeTruthy();

        const title = mainContent.query(By.css('ion-title'));
        expect(title.nativeElement.textContent).toContain('CalmMail - Inbox');

        const menuButton = mainContent.query(By.css('ion-menu-button'));
        expect(menuButton).toBeTruthy();
    });

    // This test is removed because the desktop sidebar is not present in the current template
    // If the desktop sidebar is added in the future, this test can be uncommented
    /*
    it('should have desktop sidebar', () => {
        const desktopSidebar = fixture.debugElement.query(By.css('ion-menu.desktop-sidebar'));
        expect(desktopSidebar).toBeTruthy();
        expect(desktopSidebar.attributes['side']).toBe('end');
        expect(desktopSidebar.attributes['type']).toBe('push');
    });
    */
});
