import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { MatDialog } from '@angular/material/dialog';
import { RejectedPopupComponent } from '../admin-dashboard/distributor-pending-details-popup/rejected-popup/rejected-popup.component';
import { ProposalApproveRejectComponent } from './proposal-approve-reject/proposal-approve-reject.component';

@Component({
  selector: 'app-proposal-popup',
  templateUrl: './proposal-popup.component.html',
  styleUrls: ['./proposal-popup.component.css']
})
export class ProposalPopupComponent {
  proposerDetails:boolean=true;
  insurerDetails:boolean;
  doccumentsSection:boolean;

  MatDialogRef: any;
  constructor(private dialogRef: MatDialogRef<any>,private dialog :MatDialog,
    @Inject(MAT_DIALOG_DATA) public dialogData: any, ){
  
  }
  ngOnInit(){
    
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
  onApproval(documentType,proposalId){
    this.dialog.open(ProposalApproveRejectComponent,{
      height: '265px',
      width: '445px',
      data:{documentType,proposalId}
    })
  }
  onReject(documentType,proposalId){
    this.dialog.open(ProposalApproveRejectComponent,{
      height: '384px',
      width: '603px',
      data:{documentType,proposalId}
    })

  }
 

}
