import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialog, MatDialogRef } from '@angular/material/dialog';
import { ProposalApproveRejectComponent } from 'src/app/proposal-popup/proposal-approve-reject/proposal-approve-reject.component';
import { CanselRefundPopupComponent } from './cansel-refund-popup/cansel-refund-popup.component';

@Component({
  selector: 'app-refund-popup',
  templateUrl: './refund-popup.component.html',
  styleUrls: ['./refund-popup.component.css']
})
export class RefundPopupComponent {
  proposerDetails:boolean=true;
  insurerDetails:boolean;
  doccumentsSection:boolean;
  isComment:boolean = false;
  commnt = '';


  constructor(private dialogRef: MatDialogRef<any>,private dialog :MatDialog,
    @Inject(MAT_DIALOG_DATA) public dialogData: any, ){
  
  }
  ngOnInit(): void {
   
    
  }

  openProposerDetails(){
    this.proposerDetails=true;
    this.doccumentsSection=false;
    this.insurerDetails=false;
    
  }
  openInsurerDetails(){
    this.insurerDetails=true;
    this.doccumentsSection=false;
    this.proposerDetails=false;
  }
  openDoccuments(){
    this.proposerDetails=false;
    this.doccumentsSection=true;
    this.insurerDetails=false;
  }
  closePopup(){
    this.dialogRef.close();
  }
  onReject(documentType){
    this.dialog.open(CanselRefundPopupComponent,{
      height: '384px',
      width: '603px',
      data:{documentType}
    })
  }
  onApproval(documentType){
    this.dialog.open(CanselRefundPopupComponent,{
      height: '384px',
      width: '603px',
      data:{documentType}
    })
  }
}
