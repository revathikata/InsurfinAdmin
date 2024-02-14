import { Component } from '@angular/core';
import {Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialog, MatDialogRef } from '@angular/material/dialog';
import { ProposalApproveRejectComponent } from 'src/app/proposal-popup/proposal-approve-reject/proposal-approve-reject.component';
import { PleaseConfirmPopupComponent } from '../../please-confirm-popup/please-confirm-popup.component';

@Component({
  selector: 'app-cansel-refund-popup',
  templateUrl: './cansel-refund-popup.component.html',
  styleUrls: ['./cansel-refund-popup.component.css']
})
export class CanselRefundPopupComponent {

  constructor(private dialogRef: MatDialogRef<any>,private dialog:MatDialog,
    @Inject(MAT_DIALOG_DATA) public dialogData: any,){}

    ngOnInit(){
   
     }
     onCloseIcon(){
      this.dialogRef.close();
    }
    proposalOnSubmit(documentType){
      this.dialogRef.close()
      this.dialog.open(PleaseConfirmPopupComponent,{
       height:'220px',
       width:'400px',
       data:{documentType}
    })
  }

}
