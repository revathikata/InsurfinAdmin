import { Dialog } from '@angular/cdk/dialog';
import { DatePipe } from '@angular/common';
import { Component, Inject } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { MatDialog } from '@angular/material/dialog';
import { ProposalApproveRejectComponent } from '../proposal-popup/proposal-approve-reject/proposal-approve-reject.component';



@Component({
  selector: 'app-pdf-report-download-popup',
  templateUrl: './pdf-report-download-popup.component.html',
  styleUrls: ['./pdf-report-download-popup.component.css']
})
export class PdfReportDownloadPopupComponent {
  custom:boolean=false;
  nonCustomSelection:boolean=true;
  formattedStartDate: string | null = null;
  formattedEndDate: string | null = null;
  range = new FormGroup({
    start: new FormControl<Date | null>(null),
    end: new FormControl<Date | null>(null),
  });
  datePipe: DatePipe = new DatePipe('en-US');
  constructor(private dialog:MatDialog,
    private dialogRef: MatDialogRef<PdfReportDownloadPopupComponent>,
    @Inject(MAT_DIALOG_DATA) public dialogData: any, ){}

  closeDialog(): void {
    this.dialogRef.close();
  }
  TotalLoans: any = [
 'Total Loans Issued' ,'Total Consumers', 'Total Proposals' ,'Total Policy Cancellations','Distributors','Distributors Onboarded','Pending Applications','Distributors Active','Distributors Inactive','Total Insurance Products','Total Escrow Transactions','Total Revenue Generated','All Reports'
  ]
  OnCustomSelect(){
    this.custom=true;
    this.nonCustomSelection=false;
  }
  OnDateSelection(){
    let startDate = this.range.get('start')?.value;
    let endDate = this.range.get('end')?.value;
    if (startDate !== null && endDate !== null) {
       this.formattedStartDate = this.datePipe.transform(startDate, 'yyyy-MM-dd');
      this.formattedEndDate = this.datePipe.transform(endDate, 'yyyy-MM-dd');
    }

    console.log('Start Date:', this.formattedStartDate);
    console.log('End Date:', this.formattedEndDate);
  }
  onDateDeselect(){
    this.formattedStartDate == '';
    this.formattedEndDate == '';
  }

  downloadReports(documentType){
    this.dialog.open(ProposalApproveRejectComponent,{
      width: '420px',
      height: '148px',
      data:{documentType}
    })
  }
}

