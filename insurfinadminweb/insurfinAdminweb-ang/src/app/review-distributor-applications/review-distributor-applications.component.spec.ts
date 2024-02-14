import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ReviewDistributorApplicationsComponent } from './review-distributor-applications.component';

describe('ReviewDistributorApplicationsComponent', () => {
  let component: ReviewDistributorApplicationsComponent;
  let fixture: ComponentFixture<ReviewDistributorApplicationsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ReviewDistributorApplicationsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ReviewDistributorApplicationsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
