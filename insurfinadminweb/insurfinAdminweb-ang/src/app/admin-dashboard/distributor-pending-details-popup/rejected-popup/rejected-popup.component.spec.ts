import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RejectedPopupComponent } from './rejected-popup.component';

describe('RejectedPopupComponent', () => {
  let component: RejectedPopupComponent;
  let fixture: ComponentFixture<RejectedPopupComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RejectedPopupComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RejectedPopupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
