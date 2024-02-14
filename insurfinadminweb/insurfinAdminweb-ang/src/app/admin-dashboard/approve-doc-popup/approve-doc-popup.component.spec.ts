import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ApproveDocPopupComponent } from './approve-doc-popup.component';

describe('ApproveDocPopupComponent', () => {
  let component: ApproveDocPopupComponent;
  let fixture: ComponentFixture<ApproveDocPopupComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ApproveDocPopupComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ApproveDocPopupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
