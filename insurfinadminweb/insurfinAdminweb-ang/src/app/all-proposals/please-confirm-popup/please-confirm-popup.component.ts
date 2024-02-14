import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialog, MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-please-confirm-popup',
  templateUrl: './please-confirm-popup.component.html',
  styleUrls: ['./please-confirm-popup.component.css']
})
export class PleaseConfirmPopupComponent {
  documentType:string='';
  status: any;
  constructor(private dialogRef: MatDialogRef<any>,private dialog:MatDialog,
    @Inject(MAT_DIALOG_DATA) public data: {documentType: string}){{this.documentType = data.documentType;} }
    ngOnInit(){
       
     }
     onCloseIcon(){
      this.dialogRef.close()
    }
    confirmReject(documentType){
      this.dialogRef.close()
      // console.log(this.dialogData.);
     this.dialog.open(PleaseConfirmPopupComponent,{
      height:'130px',
      width:'420px',
      data:{documentType}
     })
    }
}
