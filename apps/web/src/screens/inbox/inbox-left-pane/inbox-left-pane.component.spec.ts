import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InboxLeftPaneComponent } from './inbox-left-pane.component';
import { staticFolderIconsProvider } from '@calm-mail/frontend-ui';

describe('InboxLeftPaneComponent', () => {
    let component: InboxLeftPaneComponent;
    let fixture: ComponentFixture<InboxLeftPaneComponent>;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            imports: [InboxLeftPaneComponent],
            providers: [staticFolderIconsProvider()],
        }).compileComponents();

        fixture = TestBed.createComponent(InboxLeftPaneComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
