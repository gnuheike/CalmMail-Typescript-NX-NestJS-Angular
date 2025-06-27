import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InboxRightPaneComponent } from './inbox-right-pane.component';

describe('InboxRightPaneComponent', () => {
  let component: InboxRightPaneComponent;
  let fixture: ComponentFixture<InboxRightPaneComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [InboxRightPaneComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(InboxRightPaneComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
