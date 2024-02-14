import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { MatDialog } from '@angular/material/dialog';
import { RejectedPopupComponent } from './rejected-popup/rejected-popup.component';
import { AdminServiceService } from 'src/app/Services/admin-service.service';

@Component({
  selector: 'app-distributor-pending-details-popup',
  templateUrl: './distributor-pending-details-popup.component.html',
  styleUrls: ['./distributor-pending-details-popup.component.css']
})
export class DistributorPendingDetailsPopupComponent {
  isPersonalDetails: boolean = true;
  isDoccumentsUpload: boolean = false;
  isAffiliation:boolean = false;
  isComment:boolean = false;
  isRejectedPopup:boolean = false;
  TableData: any;
  commnt = '';
  ApprovedStatus: any;
  adminId: any;
  communicationAddress: any;
  PermentAddress: any;
  constructor(private dialogRef: MatDialogRef<any>,private dialog:MatDialog,
     @Inject(MAT_DIALOG_DATA) public dialogData: any,  public adminService: AdminServiceService,) {
  }
  ngOnInit(): void {
    console.log(this.dialogData.status);
    
 this.TableData = this.dialogData.emp
 this.communicationAddress = this.TableData?.address.filter((tab:any) =>{
  return tab.addressType === 'COMMUNICATION'
})
this.PermentAddress = this.TableData?.address.filter((tab:any) =>{
  return tab.addressType === 'PERMANENT'
})
  }
  bank:any = [
    "HDFC Ergo",
    "ICICI",
    "AVIVA LIFE INS"
  ]
  Gender: any = [
    "Male",
    "Female",
    "Others"
  ]
  TotalAffliciation:any=[
   'HDFC Ergo',
  'Aditya Birla' ,
   'ICICI' ,
   'ICICI Lombard' ,
  ]
  selectLender:any=[
    'Respo','Ramaiah Capital'
  ]
  TotalLoans:any=[]
  openPersonalDetails() {
    this.isPersonalDetails = true;
    this.isDoccumentsUpload = false;
    this.isAffiliation=false;
    this.isComment=false;
  }
  kycVerification() {
    this.isDoccumentsUpload = true;
    this.isPersonalDetails = false;
    this.isAffiliation=false;
    this.isComment=false;
  }
  affiliationLenderDetails() {
    this.isPersonalDetails = false;
    this.isDoccumentsUpload = false;
    this.isAffiliation = true;
    this.isComment=false;
  }
  rejectedComments(){
    this.isPersonalDetails = false;
    this.isDoccumentsUpload = false;
    this.isAffiliation = false;
    this.isComment = true;
  }
  closePopUp() {
    this.dialogRef.close()
  }
  openRejectedPopUp(documentType:string,uuid:any,commnt){
    const dialogRef = this.dialog.open(RejectedPopupComponent,{
      height:'265px',
      width:'445px',
      data:{documentType,uuid,commnt},
  })
  dialogRef.afterClosed().subscribe((res) => {
    if(res){
      console.log(res);
      this.dialogRef.close()
      window.location.reload()
    }
  });
  }
  onCloseIcon(){
    this.dialogRef.close()
  }
  openAcceptedPopup(documentType:string,uuid:any,commnt){
    console.log(this.TableData);
    
    this.dialog.open(RejectedPopupComponent,{
      height:'265px',
      width:'445px',
      data:{documentType,uuid,commnt}
  })
  
}

}
