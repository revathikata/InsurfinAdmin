import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { MatDialog } from '@angular/material/dialog';
import { AdminServiceService } from 'src/app/Services/admin-service.service';


@Component({
  selector: 'app-rejected-popup',
  templateUrl: './rejected-popup.component.html',
  styleUrls: ['./rejected-popup.component.css']
})
export class RejectedPopupComponent {
  
  documentType: string='';
  adminId: any;
  commnt = '';
  distributorUuid: any;
  ApprovedStatus: any;
  getData: any;
  payload:any;
constructor(private dialogRef: MatDialogRef<any>,private dialog:MatDialog, public adminService: AdminServiceService,
  @Inject(MAT_DIALOG_DATA)public data: { documentType: string;}) {this.documentType = data.documentType;}

ngOnInit(){
 this.getData = this.data
  
}


onCloseIcon(){
  this.dialogRef.close()
}
onSubmit(documentType:string){
  // this.adminId = JSON.parse(sessionStorage.getItem('AdminUuid') ?? 'null')
  // const payload =
  // {
  //   uuid : this.getData.uuid,
  //   comments: this.commnt,
  //   // approvalStatus: "REJECTED",
  //   adminId: this.adminId,
  // }
  // this.adminService.update(payload).subscribe((res: any) => {
  //   this.ApprovedStatus = res;
  //   this.dialogRef.close('success');

  // });
  this.dialogRef.close()
 this.dialog.open(RejectedPopupComponent,{
  height:'265px',
  width:'445px',
  data:{documentType}

 })
}

confirmReject(documentType:string){
  this.dialogRef.close()
  this.adminId = JSON.parse(sessionStorage.getItem('AdminUuid') ?? 'null')
  if(documentType==='rejectSucess'){
    this.payload =
    {
      approvalStatus: "APPROVAL_REJECTED", 
      comment: this.getData.commnt,
    }
  }else{
    this.payload =
    {
      approvalStatus: "APPROVAL_APPROVED", 
      comment: this.getData.commnt,
    }
  }
  this.adminService.update(this.getData.uuid,this.payload).subscribe((res: any) => {
    this.ApprovedStatus = res;
    if(res?.error == false){
      this.dialogRef.close()
    }

  });
  this.dialog.open(RejectedPopupComponent,{
    height:'133px',
  width:'445px',
  data:{documentType}
  })
}

}
