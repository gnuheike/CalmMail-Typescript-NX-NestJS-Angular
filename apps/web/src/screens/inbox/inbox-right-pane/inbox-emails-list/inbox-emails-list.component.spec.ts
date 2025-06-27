import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InboxEmailsListComponent } from './inbox-emails-list.component';

describe('InboxEmailsListComponent', () => {
  let component: InboxEmailsListComponent;
  let fixture: ComponentFixture<InboxEmailsListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [InboxEmailsListComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(InboxEmailsListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
