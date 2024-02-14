import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PdfReportDownloadPopupComponent } from './pdf-report-download-popup.component';

describe('PdfReportDownloadPopupComponent', () => {
  let component: PdfReportDownloadPopupComponent;
  let fixture: ComponentFixture<PdfReportDownloadPopupComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PdfReportDownloadPopupComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PdfReportDownloadPopupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
