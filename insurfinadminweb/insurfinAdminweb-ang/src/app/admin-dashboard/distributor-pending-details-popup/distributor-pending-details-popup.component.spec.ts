import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DistributorPendingDetailsPopupComponent } from './distributor-pending-details-popup.component';

describe('DistributorPendingDetailsPopupComponent', () => {
  let component: DistributorPendingDetailsPopupComponent;
  let fixture: ComponentFixture<DistributorPendingDetailsPopupComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DistributorPendingDetailsPopupComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DistributorPendingDetailsPopupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
