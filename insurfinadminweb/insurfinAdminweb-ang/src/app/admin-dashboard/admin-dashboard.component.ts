import { ChangeDetectorRef, Component, ElementRef, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatSidenav } from '@angular/material/sidenav';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { AdminServiceService } from '../Services/admin-service.service';
import { ApproveDocPopupComponent } from './approve-doc-popup/approve-doc-popup.component';
import { ViewDocPopupComponent } from './view-doc-popup/view-doc-popup.component';
import { FormControl, FormGroup } from '@angular/forms';
import { MatDateRangePicker } from '@angular/material/datepicker';
import { DatePipe } from '@angular/common';
import moment from 'moment';
import { MatTabChangeEvent } from '@angular/material/tabs';
import { DistributorPendingDetailsPopupComponent } from './distributor-pending-details-popup/distributor-pending-details-popup.component';
import * as XLSX from 'xlsx';
import { FilterSortingComponent } from '../filter-sorting/filter-sorting.component';
// export interface PeriodicElement {
//   name: string;
//   EmailId: string;
//   phone: number;
//   status: string;
// }
// const ELEMENT_DATA: PeriodicElement[] = [
//   {name: 'revati', EmailId: 'rev@gmail.com', phone: 90909099, status: 'pending'},
//   {name: 'anil', EmailId: 'ab@gmail.com', phone: 9898787878, status: 'pending'},
//   {name: 'ravi', EmailId: 'revu@gmail.com', phone: 100798989, status: 'pending'},
//   {name: 'swetha', EmailId: '1123@gmail.com', phone: 9090900079, status: 'pending'},
//   {name: 'revati', EmailId: 'rev@gmail.com', phone: 90909099, status: 'pending'},
//   {name: 'anil', EmailId: 'ab@gmail.com', phone: 9898787878, status: 'pending'},
//   {name: 'ravi', EmailId: 'revu@gmail.com', phone: 100798989, status: 'pending'},
//   {name: 'swetha', EmailId: '1123@gmail.com', phone: 9090900079, status: 'pending'},
  
  
// ];
@Component({
  selector: 'app-admin-dashboard',
  templateUrl: './admin-dashboard.component.html',
  styleUrls: ['./admin-dashboard.component.css']
})
export class AdminDashboardComponent {
  startDate: any;
  endDate: any;
  AllDistributorReport: any;
  distributorApprovedcount: any;
  distibutorApprovedCount: any;
  distributorRejectedcount: any;
  distributorAllcount: any;
  distributorPendingcount: any;
  requestDist: any;
  errorMessage: string;
  tableList: any[] = [];
  dataSource!: MatTableDataSource<any>;
  customerData: any;
  customername: any[] =[];
  proposalData: any[] = [];
  distributorData: any;
  TotalLoanData: any;
  constructor(private dialog: MatDialog,private datePipe: DatePipe,private cdr: ChangeDetectorRef,
    private AdminService : AdminServiceService) {

  }
  isRejected: boolean = false;
  isApproved: boolean = false;
  isPending: boolean = true;
  distributorId: any;
  dashboardData: any;
  customerId: any;
  AllCustomerList: any[] = [];
  proposalListt: any[] = [];
  selectedDate: any;
  proposalCount: any;
  customerlist: any;
  viewMore:boolean=true;
  viewLess:boolean=false;
  viewMoreDetails:boolean=true;
  viewLessDetails:boolean=false;
  mainView:boolean=false;
  totalmainView:boolean=false;
  dropdown: any = [
    "Today", "This week", "This month", "This quarter", "Custom"
  ]
  @ViewChild('datepickerInput') datepickerInput: ElementRef;

  @ViewChild('picker') picker: MatDateRangePicker<Date>
  selectedOption: string = "This week";
  range = new FormGroup({
    start: new FormControl(),
    end: new FormControl(),
  });
  displayedColumns: string[] = [
    'Name' ,
    'Joined on',
    'Aadhar Details',
    'PAN Details',
    'Status',
    'Actions',
  ];
  // displayedColumns: any = ['name','EmailId', 'phone','document', 'status',];
  pendingTableList :any[]=[{}]
  ApprovedTableList: any[] =[{}];
  RejectedTableList: any[] = [{}];
  displayedaApprovedColumns: string[] = [
    'Name',
    'Joined on',
    'Aadhaar Details',
    'PAN Details',
    'Status',
    'Actions'

  ];
  displayedRejectedColumns: string[] = [
    'Name',
    'Joined on',
    'Aadhaar Details',
    'PAN Details',
    'Status',
    'Actions'
  ];

 
ngOnInit(){
  this.selectedOption = 'This quarter';
  this.getExactDate(); 
// this.getDistributorData()
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
        console.log(this.selectedOption);
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
      }
      this.adminDashboardDetails();
      this.getDistributorCount();
      this.getDistributorDataReport();
      this.getTotalProposal();
      this.getTotalProposalCount();
      this.getCustomerDataa();
      this.getTotalLoanData();
    }
  }
  
  adminDashboardDetails() {
    const approvalStatus = ''
  this.AdminService.getAllDistributorStatus(this.startDate,this.endDate,approvalStatus).subscribe({
    next :(res: any) =>{
      this.tableList = res.data
      this.pendingTableList = this.tableList.filter((tab:any) =>{
       return tab.distributorOnBoardingStatus == 'APPROVAL_PENDING'
      });
      this.ApprovedTableList = this.tableList.filter((tab:any) =>{
        return (tab.distributorOnBoardingStatus == 'ON_BOARDING_COMPLETED' || tab.distributorOnBoardingStatus == 'APPROVAL_APPROVED'
        || tab.distributorOnBoardingStatus == 'SET_UP_PASSWORD_PENDING')
       });
       this.RejectedTableList = this.tableList.filter((tab:any) =>{
        return tab.distributorOnBoardingStatus == 'APPROVAL_REJECTED'
       });
      console.log(this.pendingTableList,'red');
      
    },
    error:(err) => {
      this.errorMessage = "No Active Internet Found, Please connect to active internet Connection."
    }
    });

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
    this.adminDashboardDetails();
    this.getDistributorCount();
    this.getDistributorDataReport();
    this.getTotalProposal();
    this.getTotalProposalCount();
    this.getCustomerDataa();
    this.getTotalLoanData();
  }

  cancel() {
    this.selectedOption === "Custom"
  }
  handleActionClick(emp: any,status) {
    this.dialog.open(DistributorPendingDetailsPopupComponent, {
      width: '70%', height: '550px',
      data: {emp,status}
    })
  }
  getCurrentQuarter(): Date {
    const currentDate = new Date();
    const quarter = Math.floor(currentDate.getMonth() / 3);
    const startOfQuarter = new Date(currentDate.getFullYear(), quarter * 3, 1);
    return startOfQuarter;
  }

  onPending() {
    this.isPending = true;
    this.isApproved = false
    this.isRejected = false
  }
  onApprove() {
    this.isPending = false;
    this.isApproved = true
    this.isRejected = false
  }
  onReject() {
    this.isPending = false;
    this.isApproved = false
    this.isRejected = true
  }
  getDistributorDataReport(){
    // const status = 'null';
    this.AdminService.getDistributorsData(this.startDate,this.endDate,status).subscribe((res:any) =>{
      this.distributorData = res?.data
    })
  }
  getTotalProposal(){
    // const status =;
    this.AdminService.getTotalProposal(this.startDate,this.endDate,status).subscribe((res:any) =>{
       this.proposalData = res?.data.totalProposals
    })
  }
  getCustomerDataa(){
    this.AdminService.gettotalCustomerData(this.startDate,this.endDate,status).subscribe((res:any) =>{
        this.customerData = res?.data
    })
  }
  getTotalLoanData(){
    this.AdminService.getTotalLoanData(this.startDate,this.endDate,status).subscribe((res:any) =>{
      this.TotalLoanData = res?.data
  })
  }
getDistributorCount(){
  this.AdminService.getDistributorCount(this.startDate,this.endDate).subscribe({
    // next : (res:any) =>{
    //   this.AllDistributorReport = res?.data
    //   this.AllDistributorReport.filter((tab:any) =>{
    //     if(tab.status === 'ALL'){
    //       this.distributorAllcount = tab.distributorsCount;
    //     }
    //     else{
    //       this.distributorAllcount = 0
    //     }
    //     if(tab.status === 'APPROVED'){
    //       this.distributorApprovedcount = tab.distributorsCount;
    //     }
    //     else{
    //       this.distributorApprovedcount = 0
    //     }
    //     if(tab.status === 'REJECTED'){
    //       this.distributorRejectedcount = tab.distributorsCount;
    //     }
    //     else{
    //       this.distributorRejectedcount = 0
    //     }
    //     if(tab.status === 'PENDING'){
    //       this.distributorPendingcount = tab.distributorsCount;
    //     }
    //     else{
    //       this.distributorPendingcount = 0
    //     }
    //   });
      
    // }
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
  distributordownloadExcel(){
    const data = [
      ['Name', 'Contact Number', 'Email ID', 'Insurer Name', 'Product Name', 'Proposal ID', 'Policy Tenure', 'Premium Amount', 'Status', 'Proposal Number', 'Loan Amount', 'Distributor Name', 'Distributor Phone Number', 'Distributor Email'],
      // Loop through the totalProposals and extract necessary fields
      // ...this.distributorData.map(proposal => [
      //   proposal.name,
      //   proposal.contactNumber,
      //   proposal.mailId,
      //   proposal.insurerName,
      //   proposal.productName,
      //   proposal.proposalId,
      //   proposal.policyTenure,
      //   proposal.premiumAmount,
      //   proposal.status,
      //   proposal.proposalNumber,
      //   proposal.loanAmount,
      //   proposal.distributorName,
      //   proposal.distributorPhoneNumber,
      //   proposal.distributorEmail,
      // ])
    ];
      const wb = XLSX.utils.book_new();
      const ws_name = 'Sheet1';
      const ws = XLSX.utils.aoa_to_sheet(data);
      ws['!cols'] = [{ width: 25 }, { width: 15 }, { width: 25 }, { width: 15 }, { width: 15 }, { width: 10 }, { width: 20 }, { width: 20 }, { width: 25 }];
      // Extract widths and set column widths accordingly
      // const proposalWidths = data.flatMap(row => row.widths || []);
      // if (proposalWidths.length > 0) {
      //   ws['!cols'] = proposalWidths.map(width => ({ width }));
      // }
    
      XLSX.utils.book_append_sheet(wb, ws, ws_name);
      const wbout = XLSX.write(wb, { bookType: 'xlsx', type: 'array' });
      const blob = new Blob([wbout], { type: 'application/octet-stream' });
    
      // Download the Excel file
      if ((window.navigator as any).msSaveOrOpenBlob) {
        (window.navigator as any).msSaveOrOpenBlob(blob, 'sample.xlsx');
      } else {
        const url = window.URL.createObjectURL(blob);
        const link = document.createElement('a');
        link.href = url;
        link.setAttribute('download', 'sample.xlsx');
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
      }
  }
  customerdownloadExcel(){
    const data = [
      ['Name', 'Phone Number', 'Email ID', 'Pan Number', 'City', 'Pin Code', 'Proposal Count'],
      // Loop through the JSON data and extract necessary fields
      ...this.customerData.map(item => [
        item.name,
        item.phoneNumber,
        item.emailId,
        item.panNumber,
        item.city || '', // Use empty string if city is null
        item.pinCode || '', // Use empty string if pinCode is null
        item.proposalCount || 0, // Use 0 if proposalCount is null
        getProposalDetails(item.proposalDetails)
      ])
    ];
  //  const data = [this.customerData.name,this.customerData.phoneNumber,this.customerData.panNumber]
    const wb = XLSX.utils.book_new();
    const ws_name = 'Sheet1';
    const ws: XLSX.WorkSheet = XLSX.utils.aoa_to_sheet(data); 
    ws['!cols'] = [{ width: 25 }, { width: 15 }, { width: 25 }, { width: 15 }, { width: 15 }, { width: 10 }, { width: 20 }, { width: 20 }, { width: 25 }];
    XLSX.utils.book_append_sheet(wb, ws, ws_name);
    const wbout: ArrayBuffer = XLSX.write(wb, { bookType: 'xlsx', type: 'array' });
    const blob = new Blob([wbout], { type: 'application/octet-stream' });
    if ((window.navigator as any).msSaveOrOpenBlob) {
      (window.navigator as any).msSaveOrOpenBlob(blob, 'sample.xlsx');
    } else { 
      const url = window.URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = url;
      link.setAttribute('download', 'sample.xlsx');
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    }
    function getProposalDetails(proposalDetails) {
      if (!proposalDetails || proposalDetails.length === 0) {
        return ''; // If no proposal details available
      }
      // Extract proposal details and concatenate them into a string
      return proposalDetails.map(proposal => `Proposal: ${proposal.proposalNumber}, Status: ${proposal.proposalStatus}, Insurer: ${proposal.insurerName}`).join('\n');
    }
}
ProposalDownloadExcel(){
  const data = [
    ['Name', 'Contact Number', 'distributor Email', 'distributor Name', 'distributor PhoneNumber', 'insurer Name',
    'Loan Amount','mailId','Policy Tenure', 'Premium Amount','product Name', 'proposalId','Proposal Number', 'Status'],
    // Loop through the totalProposals and extract necessary fields
    ...this.proposalData.map(proposal => [
      proposal.name,
      proposal.contactNumber,
      proposal.distributorEmail,
      proposal.distributorName,
      proposal.distributorPhoneNumber,
      proposal.insurerName,
      proposal.loanAmount,
      proposal.mailId,
      proposal.policyTenure,
      proposal.premiumAmount,
      proposal.productName,
      proposal.proposalId,
      proposal.proposalNumber,
      proposal.status,
    ])
  ];
    const wb = XLSX.utils.book_new();
    const ws_name = 'Sheet1';
    const ws = XLSX.utils.aoa_to_sheet(data);
    ws['!cols'] = [{ width: 25 }, { width: 15 }, { width: 25 }, { width: 15 }, { width: 15 }, { width: 10 }, { width: 20 }, { width: 20 }, { width: 25 }];
    // Extract widths and set column widths accordingly
    // const proposalWidths = data.flatMap(row => row.widths || []);
    // if (proposalWidths.length > 0) {
    //   ws['!cols'] = proposalWidths.map(width => ({ width }));
    // }
  
    XLSX.utils.book_append_sheet(wb, ws, ws_name);
    const wbout = XLSX.write(wb, { bookType: 'xlsx', type: 'array' });
    const blob = new Blob([wbout], { type: 'application/octet-stream' });
  
    // Download the Excel file
    if ((window.navigator as any).msSaveOrOpenBlob) {
      (window.navigator as any).msSaveOrOpenBlob(blob, 'sample.xlsx');
    } else {
      const url = window.URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = url;
      link.setAttribute('download', 'sample.xlsx');
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    }
}
totalLoanDownloadExcel(){
  const data = [
    ['customer Name','customer Mail', 'customer PhoneNumber','distributor Email', 'distributor Name', 'distributor PhoneNumber',
     'emi Amount','emi Paid', 'emis Overdue','insurer Name', 'last EmiDate', 'lender LoanId','lender Name','loan Amount','loan EndDate',
     'loanId','loanStartDate','loan Status'],
    // Loop through the totalProposals and extract necessary fields
    ...this.TotalLoanData.map(proposal => [
      proposal.customerName,
      proposal.customerMail,
      proposal.customerPhoneNumber,
      proposal.distributorEmail,
      proposal.distributorName,
      proposal.distributorPhoneNumber,
      proposal.emiAmount,
      proposal.emiPaid,
      proposal.emisOverdue,
      proposal.insurerName,
      proposal.lastEmiDate,
      proposal.lenderLoanId,
      proposal.lenderName,
      proposal.loanAmount,
      proposal.loanEndDate,
      proposal.loanId,
      proposal.loanStartDate,
      proposal.loanStatus,
    ])
  ];
    const wb = XLSX.utils.book_new();
    const ws_name = 'Sheet1';
    const ws = XLSX.utils.aoa_to_sheet(data);
    ws['!cols'] = [{ width: 25 }, { width: 15 }, { width: 25 }, { width: 15 }, { width: 15 }, { width: 10 }, { width: 20 }, { width: 20 }, { width: 25 }];
    // Extract widths and set column widths accordingly
    // const proposalWidths = data.flatMap(row => row.widths || []);
    // if (proposalWidths.length > 0) {
    //   ws['!cols'] = proposalWidths.map(width => ({ width }));
    // }
  
    XLSX.utils.book_append_sheet(wb, ws, ws_name);
    const wbout = XLSX.write(wb, { bookType: 'xlsx', type: 'array' });
    const blob = new Blob([wbout], { type: 'application/octet-stream' });
  
    // Download the Excel file
    if ((window.navigator as any).msSaveOrOpenBlob) {
      (window.navigator as any).msSaveOrOpenBlob(blob, 'sample.xlsx');
    } else {
      const url = window.URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = url;
      link.setAttribute('download', 'sample.xlsx');
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    }
}
OpenSorting(){
  this.dialog.open(FilterSortingComponent,{
    height:'222px',
    width:'300px'
  })
}
}
