import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProposalApproveRejectComponent } from './proposal-approve-reject.component';

describe('ProposalApproveRejectComponent', () => {
  let component: ProposalApproveRejectComponent;
  let fixture: ComponentFixture<ProposalApproveRejectComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ProposalApproveRejectComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ProposalApproveRejectComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
