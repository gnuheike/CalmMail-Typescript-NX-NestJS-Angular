import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InboxEmailViewComponent } from './inbox-email-view.component';
import { mockEmail } from '@calm-mail/frontend-domain';

describe('InboxEmailViewComponent', () => {
    let component: InboxEmailViewComponent;
    let fixture: ComponentFixture<InboxEmailViewComponent>;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            imports: [InboxEmailViewComponent],
        }).compileComponents();

        fixture = TestBed.createComponent(InboxEmailViewComponent);
        fixture.componentRef.setInput('email$', mockEmail);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
