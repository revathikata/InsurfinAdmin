import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CanselRefundPopupComponent } from './cansel-refund-popup.component';

describe('CanselRefundPopupComponent', () => {
  let component: CanselRefundPopupComponent;
  let fixture: ComponentFixture<CanselRefundPopupComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CanselRefundPopupComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CanselRefundPopupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
