import { Component, ElementRef, Inject, ViewChild } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialog } from '@angular/material/dialog';
import { MatTableDataSource } from '@angular/material/table';
import { ProposalPopupComponent } from '../proposal-popup/proposal-popup.component';
import { MatDateRangePicker } from '@angular/material/datepicker';
import { DatePipe } from '@angular/common';
import moment from 'moment';
import { AdminServiceService } from '../Services/admin-service.service';
import { PdfReportDownloadPopupComponent } from '../pdf-report-download-popup/pdf-report-download-popup.component';
import { FilterSortingComponent } from '../filter-sorting/filter-sorting.component';
import { RefundPopupComponent } from './refund-popup/refund-popup.component';
@Component({
  selector: 'app-all-proposals',
  templateUrl: './all-proposals.component.html',
  styleUrls: ['./all-proposals.component.css']
})
export class AllProposalsComponent {
  dropdown: any = [
    "Today", "This week", "This month", "This quarter", "Custom"
  ]
  pendingData:boolean=true;
  startDate: any;
  endDate: any;
  selectedDate: any;
  approvedData:boolean=false;
  rejectedData:boolean=false;
  refundData:boolean = false;
  viewMore:boolean=true;
  viewLess:boolean=false;
  viewMoreDetails:boolean=true;
  viewLessDetails:boolean=false;
  mainView:boolean=false;
  totalmainView:boolean=false;
  defaultSelectedValue = 'Pending';
  @ViewChild('datepickerInput') datepickerInput: ElementRef;

  @ViewChild('picker') picker: MatDateRangePicker<Date>
  selectedOption: string = "This week";
  range = new FormGroup({
    start: new FormControl(),
    end: new FormControl(),
  });
  dataSource!: MatTableDataSource<any>;
  
  displayedPendingColumns: string[] = [
    'Proposer Name',
    'Proposal Number',
    'Date of Proposal',
    'Product type',
    'Product Category',
    // 'Proposal name',
    'Associate Name',
    'Action'
  ];
  displayedaApprovedColumns: string[] =[
    'Proposer Name',
    'Proposal Number',
    'Date of Proposal',
    'Policy Tenure',
    'Product Category',
    'Status'

  ];
  displayedRejectedColumns: string[] =[
    'Proposer Name',
    'Proposal Number',
    'Date of Proposal',
    'Policy Tenure',
    'Product Category',
    'Status'
  ];
  displayedRefundColumns: string[] = [
    'Proposer Name',
    'Proposal Number',
    'Date of Proposal',
    'Product Tenure',
    'Product Category',
    'Status'
  ];
//   PendingData= [
//     {
//       'Proposer Name':'John Doe',
//       'Proposal Number':'#015-02020/23',
//       'Date of Proposal':'12 June 2023',
//       'Product type':'1 year plan',
//       'Product Category':'Life Insurance',
//       'Proposal name':'Silver Beema 1',
//       'Associate Name':'Rakesh Kumar',
//       Action:'View More'
//     },
//     {
//       'Proposer Name':'John Doe',
//       'Proposal Number':'#015-02020/23',
//       'Date of Proposal':'12 June 2023',
//       'Product type':'1 year plan',
//       'Product Category':'Life Insurance',
//       'Proposal name':'Silver Beema 1',
//       'Associate Name':'Rakesh Kumar',
//       Action:'View More'
//     },
//     {
//       'Proposer Name':'John Doe',
//       'Proposal Number':'#015-02020/23',
//       'Date of Proposal':'12 June 2023',
//       'Product type':'1 year plan',
//       'Product Category':'Life Insurance',
//       'Proposal name':'Silver Beema 1',
//       'Associate Name':'Rakesh Kumar',
//       Action:'View More'
//     },
//     {
//       'Proposer Name':'John Doe',
//       'Proposal Number':'#015-02020/23',
//       'Date of Proposal':'12 June 2023',
//       'Product type':'1 year plan',
//       'Product Category':'Life Insurance',
//       'Proposal name':'Silver Beema 1',
//       'Associate Name':'Rakesh Kumar',
//       Action:'View More'
//     },
//     {
//       'Proposer Name':'John Doe',
//       'Proposal Number':'#015-02020/23',
//       'Date of Proposal':'12 June 2023',
//       'Product type':'1 year plan',
//       'Product Category':'Life Insurance',
//       'Proposal name':'Silver Beema 1',
//       'Associate Name':'Rakesh Kumar',
//       Action:'View More'
//     },
//     {
//       'Proposer Name':'John Doe',
//       'Proposal Number':'#015-02020/23',
//       'Date of Proposal':'12 June 2023',
//       'Product type':'1 year plan',
//       'Product Category':'Life Insurance',
//       'Proposal name':'Silver Beema 1',
//       'Associate Name':'Rakesh Kumar',
//       Action:'View More'
//     },
//     {
//       'Proposer Name':'John Doe',
//       'Proposal Number':'#015-02020/23',
//       'Date of Proposal':'12 June 2023',
//       'Product type':'1 year plan',
//       'Product Category':'Life Insurance',
//       'Proposal name':'Silver Beema 1',
//       'Associate Name':'Rakesh Kumar',
//       Action:'View More'
//     }
//   ]
//   ApprovedData=[
//     {
//       'Proposer Name':'John Doe',
//     'Proposal Number':'#015-02020/23',
//     'Date of Proposal':'12 June 2023',
//     'Policy Tenure':'5 years',
//     'Product Category':'Life Insurance',
//     'Status':'Accepted|30 mins ago'
//   },
//   {
//     'Proposer Name':'John Doe',
//   'Proposal Number':'#015-02020/23',
//   'Date of Proposal':'12 June 2023',
//   'Policy Tenure':'5 years',
//   'Product Category':'Life Insurance',
//   'Status':'Accepted|30 mins ago'
// },
// {
//   'Proposer Name':'John Doe',
// 'Proposal Number':'#015-02020/23',
// 'Date of Proposal':'12 June 2023',
// 'Policy Tenure':'5 years',
// 'Product Category':'Life Insurance',
// 'Status':'Accepted|30 mins ago'
// },
// {
//   'Proposer Name':'John Doe',
// 'Proposal Number':'#015-02020/23',
// 'Date of Proposal':'12 June 2023',
// 'Policy Tenure':'5 years',
// 'Product Category':'Life Insurance',
// 'Status':'Accepted|30 mins ago'
// },
// {
//   'Proposer Name':'John Doe',
// 'Proposal Number':'#015-02020/23',
// 'Date of Proposal':'12 June 2023',
// 'Policy Tenure':'5 years',
// 'Product Category':'Life Insurance',
// 'Status':'Accepted|30 mins ago'
// },
//   {
//     'Proposer Name':'John Doe',
//   'Proposal Number':'#015-02020/23',
//   'Date of Proposal':'12 June 2023',
//   'Policy Tenure':'5 years',
//   'Product Category':'Life Insurance',
//   'Status':'Accepted|30 mins ago'
// },
// {
//   'Proposer Name':'John Doe',
// 'Proposal Number':'#015-02020/23',
// 'Date of Proposal':'12 June 2023',
// 'Policy Tenure':'5 years',
// 'Product Category':'Life Insurance',
// 'Status':'Accepted|30 mins ago'
// },
// {
//   'Proposer Name':'John Doe',
// 'Proposal Number':'#015-02020/23',
// 'Date of Proposal':'12 June 2023',
// 'Policy Tenure':'5 years',
// 'Product Category':'Life Insurance',
// 'Status':'Accepted|30 mins ago'
// },
// {
//   'Proposer Name':'John Doe',
// 'Proposal Number':'#015-02020/23',
// 'Date of Proposal':'12 June 2023',
// 'Policy Tenure':'5 years',
// 'Product Category':'Life Insurance',
// 'Status':'Accepted|30 mins ago'
// },
//   {
//     'Proposer Name':'John Doe',
//   'Proposal Number':'#015-02020/23',
//   'Date of Proposal':'12 June 2023',
//   'Policy Tenure':'5 years',
//   'Product Category':'Life Insurance',
//   'Status':'Accepted|30 mins ago'
// },
// {
//   'Proposer Name':'John Doe',
// 'Proposal Number':'#015-02020/23',
// 'Date of Proposal':'12 June 2023',
// 'Policy Tenure':'5 years',
// 'Product Category':'Life Insurance',
// 'Status':'Accepted|30 mins ago'
// },
// {
//   'Proposer Name':'John Doe',
// 'Proposal Number':'#015-02020/23',
// 'Date of Proposal':'12 June 2023',
// 'Policy Tenure':'5 years',
// 'Product Category':'Life Insurance',
// 'Status':'Accepted|30 mins ago'
// },
// {
//   'Proposer Name':'John Doe',
// 'Proposal Number':'#015-02020/23',
// 'Date of Proposal':'12 June 2023',
// 'Policy Tenure':'5 years',
// 'Product Category':'Life Insurance',
// 'Status':'Accepted|30 mins ago'
// }
    
//   ]
  // RejectedData=[
  //   {
  //     'Proposer Name':'John Doe',
  //     'Proposal Number':'#015-02020/23',
  //     'Date of Proposal':'12 June 2023',
  //     'Policy Tenure':'5 years',
  //     'Product Category':'Life Insurance',
  //     'Doccuments':'KYC - Front | Back, PAN, Cheque, Bank Statement',
  //     'Status':'Rejected|3 hours ago'
  //   },
  //   {
  //     'Proposer Name':'John Doe',
  //     'Proposal Number':'#015-02020/23',
  //     'Date of Proposal':'12 June 2023',
  //     'Policy Tenure':'5 years',
  //     'Product Category':'Life Insurance',
  //     'Doccuments':'KYC - Front | Back, PAN, Cheque, Bank Statement',
  //     'Status':'Rejected|3 hours ago'
  //   },
  //   {
  //     'Proposer Name':'John Doe',
  //     'Proposal Number':'#015-02020/23',
  //     'Date of Proposal':'12 June 2023',
  //     'Policy Tenure':'5 years',
  //     'Product Category':'Life Insurance',
  //     'Doccuments':'KYC - Front | Back, PAN, Cheque, Bank Statement',
  //     'Status':'Rejected|3 hours ago'
  //   } ,
  //   {
  //     'Proposer Name':'John Doe',
  //     'Proposal Number':'#015-02020/23',
  //     'Date of Proposal':'12 June 2023',
  //     'Policy Tenure':'5 years',
  //     'Product Category':'Life Insurance',
  //     'Doccuments':'KYC - Front | Back, PAN, Cheque, Bank Statement',
  //     'Status':'Rejected|3 hours ago'
  //   },
  //   {
  //     'Proposer Name':'John Doe',
  //     'Proposal Number':'#015-02020/23',
  //     'Date of Proposal':'12 June 2023',
  //     'Policy Tenure':'5 years',
  //     'Product Category':'Life Insurance',
  //     'Doccuments':'KYC - Front | Back, PAN, Cheque, Bank Statement',
  //     'Status':'Rejected|3 hours ago'
  //   }
  //   ,
  //   {
  //     'Proposer Name':'John Doe',
  //     'Proposal Number':'#015-02020/23',
  //     'Date of Proposal':'12 June 2023',
  //     'Policy Tenure':'5 years',
  //     'Product Category':'Life Insurance',
  //     'Doccuments':'KYC - Front | Back, PAN, Cheque, Bank Statement',
  //     'Status':'Rejected|3 hours ago'
  //   },
  //   {
  //     'Proposer Name':'John Doe',
  //     'Proposal Number':'#015-02020/23',
  //     'Date of Proposal':'12 June 2023',
  //     'Policy Tenure':'5 years',
  //     'Product Category':'Life Insurance',
  //     'Doccuments':'KYC - Front | Back, PAN, Cheque, Bank Statement',
  //     'Status':'Rejected|3 hours ago'
  //   } ,
  //   {
  //     'Proposer Name':'John Doe',
  //     'Proposal Number':'#015-02020/23',
  //     'Date of Proposal':'12 June 2023',
  //     'Policy Tenure':'5 years',
  //     'Product Category':'Life Insurance',
  //     'Doccuments':'KYC - Front | Back, PAN, Cheque, Bank Statement',
  //     'Status':'Rejected|3 hours ago'
  //   },
  //   {
  //     'Proposer Name':'John Doe',
  //     'Proposal Number':'#015-02020/23',
  //     'Date of Proposal':'12 June 2023',
  //     'Policy Tenure':'5 years',
  //     'Product Category':'Life Insurance',
  //     'Doccuments':'KYC - Front | Back, PAN, Cheque, Bank Statement',
  //     'Status':'Rejected|3 hours ago'
  //   } ,
  //   {
  //     'Proposer Name':'John Doe',
  //     'Proposal Number':'#015-02020/23',
  //     'Date of Proposal':'12 June 2023',
  //     'Policy Tenure':'5 years',
  //     'Product Category':'Life Insurance',
  //     'Doccuments':'KYC - Front | Back, PAN, Cheque, Bank Statement',
  //     'Status':'Rejected|3 hours ago'
  //   },
  //   {
  //     'Proposer Name':'John Doe',
  //     'Proposal Number':'#015-02020/23',
  //     'Date of Proposal':'12 June 2023',
  //     'Policy Tenure':'5 years',
  //     'Product Category':'Life Insurance',
  //     'Doccuments':'KYC - Front | Back, PAN, Cheque, Bank Statement',
  //     'Status':'Rejected|3 hours ago'
  //   } ,
  //   {
  //     'Proposer Name':'John Doe',
  //     'Proposal Number':'#015-02020/23',
  //     'Date of Proposal':'12 June 2023',
  //     'Policy Tenure':'5 years',
  //     'Product Category':'Life Insurance',
  //     'Doccuments':'KYC - Front | Back, PAN, Cheque, Bank Statement',
  //     'Status':'Rejected|3 hours ago'
  //   },
  //   {
  //     'Proposer Name':'John Doe',
  //     'Proposal Number':'#015-02020/23',
  //     'Date of Proposal':'12 June 2023',
  //     'Policy Tenure':'5 years',
  //     'Product Category':'Life Insurance',
  //     'Doccuments':'KYC - Front | Back, PAN, Cheque, Bank Statement',
  //     'Status':'Rejected|3 hours ago'
  //   }



  // ]
  // pendingDatasource = new MatTableDataSource(this.PendingData);
  // approvedDatasource = new MatTableDataSource(this.ApprovedData);
  // rejectedDatasource = new MatTableDataSource(this.RejectedData);
  allproposal: any[] =[{}];
  pendingTableList :any[]=[{}]
  ApprovedTableList: any[] =[{}];
  RejectedTableList: any[] = [{}];
  RefundTableList: any[] = [{}];
  errorMessage: string;
  AllDistributorReport: any[] =[];
  distributorAllcount: any;
  distributorApprovedcount: any;
  distributorRejectedcount: any;
  distributorPendingcount: any;
  proposalStatus: any;
 
constructor( private dialogRef :MatDialog,private datePipe: DatePipe,
  private AdminService : AdminServiceService,private dialog:MatDialog){

}
ngOnInit(){
  this.selectedOption = 'This quarter';
  this.getExactDate();
  this.onPending();
}

onDropdownChange() {
  this.getExactDate();
  if (this.selectedOption === "Custom") {
    this.range.reset();
    setTimeout(() => {
      this.picker.open();
    });
  }
}
getFormattedDateRange() {
  const start = this.range?.get('start')?.value;
  const end = this.range?.get('end')?.value;
  if (!start || !end) {
    return '';
  }
  const formattedStart = moment(start).format('MMM DD');
  const formattedEnd = moment(end).format('MMM DD');
  if (this.selectedOption === "Custom") {
      this.selectedOption = `${formattedStart} - ${formattedEnd}`  
  }

  return `${formattedStart} - ${formattedEnd}`;
}


formatDateEvent(value: string, controlName: string): void {
  const control = this.range.get(controlName);
  const parsedDate = moment(value, 'YYYY-MM-DD', false);
  if (control && parsedDate.isValid()) {
    control.setValue(parsedDate.toDate());
    if (controlName === 'start') {
      this.startDate = this.datePipe.transform(new Date(control.value), 'yyyy-MM-dd');
    } else {
      this.endDate = this.datePipe.transform(new Date(control.value), 'yyyy-MM-dd');
     // this.adminDashboardDetails();
    }
    // this.getTotalProposal();
  this.getDistributorCount();
  this.getTotalProposalCount();
  }
}
cancel(){
  this.selectedOption === "Custom" 
 }
 onClick(emp: any){
    this.dialogRef.open(ProposalPopupComponent,
      {
        data: emp,
        width: '70%',height:'550px',
      })
 }

 onApprove(){
  this.approvedData=true;
  if(this.approvedData = true){
    const status = 'ACCEPTED'
    this.AdminService.getTotalProposal(this.startDate,this.endDate,status).subscribe({
      next : (res:any) =>{
        this.ApprovedTableList = res?.data.totalProposals
      }
    });
  }
  this.rejectedData=false;
  this.pendingData=false;
  this.refundData = false;
 }
 onReject(){
  this.pendingData=false;
  this.approvedData=false;
  this.rejectedData=true;
  if(this.rejectedData = true){
    const status = 'CANCELLED'
    this.AdminService.getTotalProposal(this.startDate,this.endDate,status).subscribe({
      next : (res:any) =>{
        this.RejectedTableList = res?.data.totalProposals
      }
    });
  }
  this.refundData = false;
 }
 onPending(){
  this.pendingData=true;
  if(this.pendingData = true){
  const status = 'PENDING'
  this.AdminService.getTotalProposal(this.startDate,this.endDate,status).subscribe({
    next : (res:any) =>{
      this.pendingTableList = res?.data.totalProposals
    }
  })

}
  this.approvedData=false;
  this.rejectedData=false;
  this.refundData = false;
 }
 onRefund(){
  this.pendingData=false;
  this.approvedData=false;
  this.rejectedData=false;
  this.refundData = true;
  if(this.refundData = true){
    const status = 'REFUND_INITIATED'
    this.AdminService.getTotalProposal(this.startDate,this.endDate,status).subscribe({
      next : (res:any) =>{
        this.RefundTableList = res?.data.totalProposals
      }
    })
  }
 }
 getCurrentQuarter(): Date {
  const currentDate = new Date();
  const quarter = Math.floor(currentDate.getMonth() / 3);
  const startOfQuarter = new Date(currentDate.getFullYear(), quarter * 3, 1);
  return startOfQuarter;
}

 getExactDate() {
  let date: string | null = null;
  switch (this.selectedOption) {
    case 'Today':
      date = this.datePipe.transform(new Date(), 'yyyy-MM-dd');
      this.startDate = date;
      this.endDate = date;
      break;
    case 'This week':
      const currentWeek = new Date();
      // this.startDate = this.datePipe.transform(new Date(), 'yyyy-MM-dd');
      // this.endDate = this.datePipe.transform(new Date(new Date().getTime() + 6 * 24 * 60 * 60 * 1000), 'yyyy-MM-dd');
      this.startDate = this.datePipe.transform(new Date(currentWeek.setDate(currentWeek.getDate() - currentWeek.getDay())), 'yyyy-MM-dd');
      this.endDate = this.datePipe.transform(new Date(currentWeek.setDate(currentWeek.getDate() - currentWeek.getDay() + 6)), 'yyyy-MM-dd');
      date = `${this.startDate} - ${this.endDate}`;
      break;
    case 'This month':
      const currentDate = new Date();
      this.startDate = this.datePipe.transform(new Date(currentDate.getFullYear(), currentDate.getMonth(), 1), 'yyyy-MM-dd');
      this.endDate = this.datePipe.transform(new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 0), 'yyyy-MM-dd');
      date = `${this.startDate} - ${this.endDate}`;
      break;
    case 'This quarter':
      const currentQuarter = this.getCurrentQuarter();
      this.startDate = this.datePipe.transform(
        currentQuarter,
        'yyyy-MM-dd'
      );
      this.endDate = this.datePipe.transform(
        new Date(
          currentQuarter.getFullYear(),
          currentQuarter.getMonth() + 3,
          0
        ),
        'yyyy-MM-dd'
      );
      date = `${this.startDate} - ${this.endDate}`;
      break;
    default:
      date = '';
      break;
  }
  this.selectedDate = (date ?? '')
  // return date ?? '';
  // this.getTotalProposal();
  this.getDistributorCount();
  this.getTotalProposalCount();
}
// getTotalProposal(){
//   this.AdminService.getTotalProposal(this.startDate,this.endDate,status).subscribe({
//   // this.allproposal = res?.data.totalProposals
//   next :(res: any) =>{
//     // this.allproposal = res?.data.totalProposals
//     // this.pendingTableList = this.allproposal.filter((tab:any) =>{
//     //  return tab.status == 'PENDING'
//     // });
//     // this.ApprovedTableList = this.allproposal.filter((tab:any) =>{
//     //   return tab.status == 'ACCEPTED'
      
//     //  });
//     //  this.RejectedTableList = this.allproposal.filter((tab:any) =>{
//     //   return tab.status == 'CANCELLED'
//     //  });
//     //  this.RefundTableList = this.allproposal.filter((tab:any) =>{
//     //   return tab.status == 'REFUND_INITIATED'
//     //  });
//   },
//   error:(err) => {
//     this.errorMessage = "No Active Internet Found, Please connect to active internet Connection."
//   }
//   })
// }
getDistributorCount(){
  this.AdminService.getDistributorCount(this.startDate,this.endDate).subscribe({
    next: (res: any) => {
      this.AllDistributorReport = res?.data || [];
    
      if (this.AllDistributorReport.length === 0) {
        console.log('no data');
        this.distributorAllcount = 0;
        this.distributorApprovedcount = 0;
        this.distributorRejectedcount = 0;
        this.distributorPendingcount = 0;
      } else {
        this.distributorAllcount = 0;
        this.distributorApprovedcount = 0;
        this.distributorRejectedcount = 0;
        this.distributorPendingcount = 0;
        this.AllDistributorReport.forEach((tab: any) => {
          switch (tab.status) {
            case 'ALL':
              this.distributorAllcount = tab.distributorsCount;
              break;
            case 'APPROVED':
              this.distributorApprovedcount = tab.distributorsCount;
              break;
            case 'REJECTED':
              this.distributorRejectedcount = tab.distributorsCount;
              break;
            case 'PENDING':
              this.distributorPendingcount = tab.distributorsCount;
              break;
            default:
              // Handle unexpected status, if necessary
              break;
          }
        });
      }
    }
  })
}
getTotalProposalCount(){
  // const status = ''
  this.AdminService.gettotalproposalscount(this.startDate,this.endDate,status).subscribe({
  });
}
downloadReports(){
  this.dialog.open(PdfReportDownloadPopupComponent),{
    width:'864px',
    height:'924px'
}
}
onViewLess(){
  this.viewMore=true;
  this.viewLess=false;
}

onViewMore(){
  this.viewMore=false;
  this.viewLess=true;
}
onViewLesss(){
  this.viewMoreDetails=true;
  this.viewLessDetails=false;
}
onViewMoree(){
  this.viewMoreDetails=false;
  this.viewLessDetails=true;
}
onViewMoreLink(){
  this.mainView=true
}
onviewAll(){
  this.totalmainView=true;
  this.mainView=false
}
customerdownloadExcel(){
  this.dialog.open(PdfReportDownloadPopupComponent),{
    width:'864px',
    height:'924px'
}
}
distributordownloadExcel(){
  this.dialog.open(PdfReportDownloadPopupComponent),{
    width: '864px',
    height: '924px'
  }
}
totalLoanDownloadExcel(){
  this.dialog.open(PdfReportDownloadPopupComponent),{
    width:'864px',
    height:'924px'
}
}
ProposalDownloadExcel(){
  this.dialog.open(PdfReportDownloadPopupComponent),{
    width:'864px',
    height:'924px'
}
}
openSortingFilter(){
  this.dialog.open(FilterSortingComponent,{
    height:'222px',
    width:'300px'
  })
}
personalDetailsRefund(){
  this.dialog.open(RefundPopupComponent)
}
}


