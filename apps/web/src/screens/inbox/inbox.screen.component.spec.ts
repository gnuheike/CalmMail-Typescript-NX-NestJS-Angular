import { ComponentFixture, TestBed } from '@angular/core/testing';
import { InboxScreenComponent } from './inbox.screen.component';
import { Component, Input, signal } from '@angular/core';
import { IonicModule } from '@ionic/angular';
import { InboxFacade } from '@calm-mail/frontend-application';
import { EmailEntity, FolderEntity } from '@calm-mail/frontend-domain';
import { LogMessage } from '@calm-mail/frontend-shared';
import { staticFolderIconsProvider } from '@calm-mail/frontend-ui';

// Mock components
@Component({
    selector: 'app-inbox-left-pane',
    template: '<div>Mock Left Pane</div>',
})
class MockInboxLeftPaneComponent {
    @Input() folders$: FolderEntity[] = [];
    @Input() foldersError$: string | null = null;
    @Input() foldersLoading$ = false;
}

@Component({
    selector: 'app-inbox-right-pane',
    template: '<div>Mock Right Pane</div>',
})
class MockInboxRightPaneComponent {
    @Input() emails$: EmailEntity[] = [];
    @Input() emailsError$: string | null = null;
    @Input() emailsLoading$ = false;
    @Input() selectedFolder$: FolderEntity | undefined;
}

describe('InboxScreenComponent', () => {
    let component: InboxScreenComponent;
    let fixture: ComponentFixture<InboxScreenComponent>;
    let mockInboxFacade: Partial<InboxFacade>;

    beforeEach(async () => {
        // Create a mock InboxFacade
        mockInboxFacade = {
            initializeView: jest.fn(),
            selectFolder: jest.fn(),
            // Add minimal signal properties to satisfy the component
            folders$: signal<FolderEntity[] | null>([]),
            foldersLoading$: signal<boolean>(false),
            foldersError$: signal<LogMessage | null>(null),
            emails$: signal<EmailEntity[] | null>([]),
            emailsLoading$: signal<boolean>(false),
            emailsError$: signal<LogMessage | null>(null),
            selectedFolder$: signal<FolderEntity | undefined>(undefined),
        };

        await TestBed.configureTestingModule({
            declarations: [],
            imports: [InboxScreenComponent, IonicModule.forRoot(), MockInboxLeftPaneComponent, MockInboxRightPaneComponent],
            providers: [{ provide: InboxFacade, useValue: mockInboxFacade }, staticFolderIconsProvider()],
        }).compileComponents();

        fixture = TestBed.createComponent(InboxScreenComponent);
        component = fixture.componentInstance;
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });

    it('should initialize view on construction', () => {
        expect(mockInboxFacade.initializeView).toHaveBeenCalled();
    });
});
