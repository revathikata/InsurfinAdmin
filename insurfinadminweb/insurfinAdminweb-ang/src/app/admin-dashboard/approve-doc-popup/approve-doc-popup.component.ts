import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { AdminServiceService } from '../../Services/admin-service.service';

@Component({
  selector: 'app-approve-doc-popup',
  templateUrl: './approve-doc-popup.component.html',
  styleUrls: ['./approve-doc-popup.component.css']
})
export class ApproveDocPopupComponent {
  tables: any =
    { distributorName: 'distributorName', contact: 'phoneNumber', email: 'anil@gmail.com', addressLine1: 'addressLine1', address2: '1-3-4,tk street', city: 'city', state: 'state', pinCode: 'pinCode' }

  requestDist: any = [];
  aadhaar: any;
  selectedtablerow: any;
  distId: any;
  statuss: any = [];
  errorMsg: any;
  alltable: any;
  TableOneSelections: any;
  approvedd: any = [];
  distrubutorrow: any = [];
  allComplete: any = [];
  subtask: any;
  isChecked: any;
  checkBoxValue: any = false;
  documnt: any;
  commnt = '';
  selectedDocumentRow: any;
  dataapprv: any;
  checkAdharBack: boolean = false;
  checkpan: boolean = false;
  checkbank: boolean = false;
  statusApproved: any;
  aadharfrontId: any;
  aadharapproved: any[] = [];
  rejectedlist: any[] = [];
  fstapprv: any[] = []
  Aadharback: any;
  pancard: any;
  bankcheque: any;
  aadharfrontImg: any;
  aadharBackimg:any
  panCardimg: any;
  constructor(
    public distributerService: AdminServiceService,
    private dialogRef: MatDialogRef<any>,

    @Inject(MAT_DIALOG_DATA) public data: any) { }

  ngOnInit(): void {
    // this.selectedtablerow = JSON.parse(localStorage.getItem('selectedRow') ?? '')
    this.selectedtablerow = this.data;
    this.alltable = this.selectedtablerow;
    // this.documnt =this.selectedtablerow.map((tab:any) => {
    //   return tab.distributorId
    // });
    this.aadharfrontImg = this.alltable[0].documents.find((doc:any)=> doc.documentType === 'AADHAR_FRONT_IMG').s3Url
    this.aadharBackimg = this.alltable[0].documents.find((doc:any)=> doc.documentType === 'AADHAR_BACK_IMG').s3Url
    this.panCardimg = this.alltable[0].documents.find((doc:any)=> doc.documentType === 'PAN_CARD').s3Url
  }

  update() {
    const payload =
    {
      approvalStatus: "APPROVED",
      comment: this.commnt,
      documentStatus: this.aadharapproved
    }
    const selectedRow: any = JSON.parse(localStorage.getItem('selectedRow') ?? '')
    // this.distributerService.update(payload, selectedRow[0]?.userId).subscribe((res: any) => {
    //   this.dataapprv = res;
    //   // this.fstapprv = this.aadharapproved
    //   this.dialogRef.close('success');

    // });
  }
  getsreject(doc: any) {

  }
  checkCheckBoxvalue(event: any, doc: any,index:any) {
    const documentIndex = this.getIndexOfDocument(doc.documents[index].documentId)
    if (documentIndex == 0) {
      doc.documents[index].approvalStatus = (event.checked) ? "APPROVED" : "REJECTED"
      this.aadharapproved.push({ approvalStatus: doc.documents[index].approvalStatus, documentId: doc.documents[index].documentId })
    }
    else {
      this.aadharapproved[documentIndex].approvalStatus = doc?.documents[index]?.approvalStatus;
    }
  }
  getIndexOfDocument(documentId: any) {
    let index = 0;
    this.aadharapproved.map((element, row) => {
      if (element.documentId == documentId) {
        index = row;
      }
    })
    return index;
  }
  // checkAadharBack(event: any, doc: any) {
  //   if (event.checked) {
  //     doc.documents[1].approvalStatus = "APPROVED"
  //     this.aadharapproved.push({ approvalStatus: doc.documents[1].approvalStatus, documentId: doc.documents[1].documentId })
  //     console.log(doc, 'doc')
  //   }
  //   else {
  //     doc.documents[1].approvalStatus = "REJECTED"
  //     this.aadharapproved.push({ approvalStatus: doc.documents[1].approvalStatus, documentId: doc.documents[1].documentId })
  //     console.log('rej', doc);
  //   }
  // }
  // checkPan(event: any, doc: any) {
  //   if (event.checked) {
  //     doc.documents[2].approvalStatus = "APPROVED"
  //     this.aadharapproved.push({ approvalStatus: doc.documents[2].approvalStatus, documentId: doc.documents[2].documentId })
  //     console.log(doc, 'doc')
  //   }
  //   else {
  //     doc.documents[2].approvalStatus = "REJECTED"
  //     this.aadharapproved.push({ approvalStatus: doc.documents[2].approvalStatus, documentId: doc.documents[2].documentId })
  //     console.log('rej', doc);
  //   }
  //   // if(!event.checkpan){
  //   //   doc.documents[2].approvalStatus = "REJECTED"
  //   //   this.aadharapproved.push({approvalStatus: doc.documents[2].approvalStatus,documentId:doc.documents[2].documentId})
  //   //   console.log(doc,'unchk');
  //   // }
  // }
  // checkBankCheq(event: any, doc: any) {
  //   if (event.checked) {
  //     doc.documents[3].approvalStatus = "APPROVED"
  //     this.aadharapproved.push({ approvalStatus: doc.documents[3].approvalStatus, documentId: doc.documents[3].documentId })
  //     console.log(doc, 'doc')
  //   }
  //   else {
  //     doc.documents[3].approvalStatus = "REJECTED"
  //     this.aadharapproved.push({ approvalStatus: doc.documents[3].approvalStatus, documentId: doc.documents[3].documentId })
  //     console.log('rej', doc);
  //   }

  // }
  reject(doc: any) {
    const payload =
    {
      approvalStatus: "REJECTED",
      comment: this.commnt,
      documentStatus: this.getRejectedList()
    }
    const selectedRow: any = JSON.parse(localStorage.getItem('selectedRow') ?? '')
    // this.distributerService.update(payload, selectedRow[0]?.userId).subscribe((res: any) => {
    //   this.dataapprv = res;
    //   this.dialogRef.close('success');

    // });
  }
  getRejectedList() {
    let rejectArray :any =[];
    this.alltable[0].documents.map((element: any) => {
      const documentId = element.documentId;
      let itemExist: boolean = false;
      this.aadharapproved.forEach(approvedItem => {
        if ((documentId == approvedItem.documentId && approvedItem.approvalStatus == "REJECTED")) {
          rejectArray.push({ approvalStatus: 'REJECTED', documentId: element.documentId })
          itemExist = true;
        }
        else if (documentId == approvedItem.documentId && approvedItem.approvalStatus == "APPROVED") {
          rejectArray.push({ approvalStatus: 'APPROVED', documentId: element.documentId })
          itemExist = true;
        }
      });
      if (!itemExist) {
        rejectArray.push({ approvalStatus: 'REJECTED', documentId: element.documentId })
      }
    })
    return rejectArray
  }
  // displayImages(i:any){
  //   console.log(this.alltable);    
  //  this.aadharImg = this.alltable[0].documents.find((doc:any)=> doc.documentType === 'AADHAR_FRONT_IMG').s3Url
  //   console.log(this.aadharImg,'aadhr');
  // }
}
