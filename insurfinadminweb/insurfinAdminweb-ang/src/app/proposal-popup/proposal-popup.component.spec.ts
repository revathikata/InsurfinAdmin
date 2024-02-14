import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProposalPopupComponent } from './proposal-popup.component';

describe('ProposalPopupComponent', () => {
  let component: ProposalPopupComponent;
  let fixture: ComponentFixture<ProposalPopupComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ProposalPopupComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ProposalPopupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
