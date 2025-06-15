import { ComponentFixture, TestBed } from '@angular/core/testing';
import { InboxScreenComponent } from './inbox.screen.component';
import { By } from '@angular/platform-browser';

describe('InboxComponent', () => {
    let component: InboxScreenComponent;
    let fixture: ComponentFixture<InboxScreenComponent>;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            imports: [InboxScreenComponent],
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

    it('should have desktop sidebar', () => {
        const desktopSidebar = fixture.debugElement.query(By.css('ion-menu.desktop-sidebar'));
        expect(desktopSidebar).toBeTruthy();
        expect(desktopSidebar.attributes['side']).toBe('end');
        expect(desktopSidebar.attributes['type']).toBe('push');
    });
});
