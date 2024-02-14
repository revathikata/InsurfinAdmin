import { Component,Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialog, MatDialogRef } from '@angular/material/dialog';
import { AdminServiceService } from 'src/app/Services/admin-service.service';
import { RejectedPopupComponent } from 'src/app/admin-dashboard/distributor-pending-details-popup/rejected-popup/rejected-popup.component';

@Component({
  selector: 'app-proposal-approve-reject',
  templateUrl: './proposal-approve-reject.component.html',
  styleUrls: ['./proposal-approve-reject.component.css']
})
export class ProposalApproveRejectComponent {
  proposalId: any;
  status: any;

  constructor(private dialogRef: MatDialogRef<any>,private dialog:MatDialog, public adminService: AdminServiceService,
    @Inject(MAT_DIALOG_DATA) public dialogData: any){}
    ngOnInit(){
       this.proposalId = this.dialogData.proposalId
       console.log(this.proposalId);
     }
     onSubmit(documentType,proposalId){
      this.dialogRef.close()
     this.dialog.open(ProposalApproveRejectComponent,{
      height:'265px',
      width:'445px',
      data:{documentType,proposalId}
    
     })
    }
    proposalOnSubmit(documentType){
      this.dialogRef.close()
      this.dialog.open(RejectedPopupComponent,{
       height:'220px',
       width:'400px',
       data:{documentType}
    })
  }
    onCloseIcon(){
      this.dialogRef.close()
    }
    // confirmApprove(documentType){
    //   this.dialogRef.close()
    //   this.dialog.open(ProposalApproveRejectComponent,{
    //     height:'100px',
    //   width:'445px',
    //   data:{documentType :'approveSucess'}
    //   })
    // }
    confirmReject(documentType,proposalId){
      this.dialogRef.close()
      console.log(this.dialogData.proposalId);
      if(documentType ==='rejectSucess'){
        this.status = 'REJECTED'
      }
      else{
        this.status = 'APPROVE'
      }
      this.adminService.adminproposalStatus(this.status,proposalId).subscribe((res: any) => {
        if(res?.error == false){
          if(documentType ==='rejectSucess'){
            this.dialog.open(ProposalApproveRejectComponent,{
              height:'133px',
            width:'445px',
            data:{documentType :'rejectSucess'}
            })
            this.dialogRef.close()
          }
          else{
            this.dialog.open(ProposalApproveRejectComponent,{
              height:'133px',
            width:'445px',
            data:{documentType : 'approveSucess'}
            })
          }
          this.dialogRef.close()
        }
    
      });
      // this.dialog.open(ProposalApproveRejectComponent,{
      //           height:'133px',
      //         width:'445px',
      //         data:{documentType :'rejectSucess'}
      //         })
    }
}
