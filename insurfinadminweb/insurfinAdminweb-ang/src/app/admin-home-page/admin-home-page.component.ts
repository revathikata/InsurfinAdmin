import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { DatePipe } from '@angular/common';
import { MatDateRangePicker } from '@angular/material/datepicker';
import moment from 'moment';
import { Router } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { PdfReportDownloadPopupComponent } from '../pdf-report-download-popup/pdf-report-download-popup.component';
import { AdminServiceService } from '../Services/admin-service.service';
// import { jsPDF } from 'jspdf';
import * as pdfMake from 'pdfmake/build/pdfmake';
import * as pdfFonts from 'pdfmake/build/vfs_fonts';
import { MatRadioChange } from '@angular/material/radio';
@Component({
  selector: 'app-admin-home-page',
  templateUrl: './admin-home-page.component.html',
  styleUrls: ['./admin-home-page.component.css']
})
export class AdminHomePageComponent implements OnInit{

  
  @ViewChild('datepickerInput') datepickerInput: ElementRef;

  @ViewChild('picker') picker: MatDateRangePicker<Date>
  range = new FormGroup({
    start: new FormControl(),
    end: new FormControl(),
  });
  dropdown:any=[
    "Today","This week","This month","This quarter","Custom"
  ]
  selectedOption: string;
  selectedDate: any;
  startDate: string | null;
  endDate: string | null;
  selectedFormat:string

  constructor(
    private datePipe: DatePipe,
    private formBuilder: FormBuilder , 
    private router :Router, 
    private dialog:MatDialog,
    private service:AdminServiceService
    ){    
      (window as any).pdfMake.vfs = pdfFonts.pdfMake.vfs; 
      this.range = this.formBuilder.group({
     start: [null, Validators.required],
     end: [null, Validators.required]
   });
  }

  ngOnInit(): void {
    this.selectedOption = 'This quarter';
    this.getExactDate();
  }

  handleRadioChange(event: MatRadioChange) {
    this.selectedFormat = event.value;
    console.log(this.selectedFormat);
  }

  // get-total-proposals
  totalproposal:any=[]
  
  getToatlProposals(){
    // const propObj={
    //   fromDate:this.startDate,
    //   toDate:this.endDate
    // }
    this.service.gettotalproposalscount(this.startDate,this.endDate,status).subscribe({
      next:(res:any)=>{
        // this.totalproposal= res.data
        console.log(res.data);
        const mergedData = res.data.reduce((result, obj) => {
          const { proposalGroupName, proposalCount } = obj;
          
          if (result.hasOwnProperty(proposalGroupName)) {
              result[proposalGroupName].proposalCount += proposalCount;
          } else {
              result[proposalGroupName] = { ...obj };
          }
          
          return result;
      }, {});
      
      this.totalproposal= Object?.values(mergedData);
      console.log(this.totalproposal);
      },
      error:(err:any)=>{
        alert('ToatlProposals : '+err)
      }
    })
  }

  // get all distributor values
  distributorcount:any=[]
  getDistributorCount(){
    console.log(this.startDate,this.endDate);
    this.service.getDistributorCount(this.startDate,this.endDate).subscribe({
      next:(res:any)=>{
        // this.distributorcount =res?.data
        console.log(res);
      },
      error:(err:any)=>{
        console.log(err);
      }
    })
  }
  // PDF and Csv download based on selectedformatted value
  statusname:any=[]
  getdata(data:any){
    // const object={
    //   fromDate:this.startDate,
    //   status:data.status,
    //   toDate:this.endDate
    // }
    this.statusname=data.displayStatus
    console.log(data.displayStatus);
    this.service.getDistributorsData(this.startDate,this.endDate,this.statusname).subscribe((res: any) => {
      console.log(res.data);
      const data = res?.data;
    
      if (this.selectedFormat === 'csv') {
        // Generate CSV file
        let csvContent = Object.keys(data[0]).join(',') + '\n';
        data.forEach((item) => {
          const row = Object.values(item).map((value) => {
            if (typeof value === 'string' && /^\d+(\.\d+)?[Ee]\+\d+$/.test(value)) {
              return `"${value}"`;
            }
            return value;
          });
          csvContent += row.join(',') + '\n';
        });
        const csvBlob = new Blob([csvContent], { type: 'text/csv' });
        const csvUrl = URL.createObjectURL(csvBlob);
        const csvLink = document.createElement('a');
        csvLink.href = csvUrl;
        csvLink.download = this.statusname;
        csvLink.click();
        URL.revokeObjectURL(csvUrl);
      } else if (this.selectedFormat === 'pdf') {
        // Generate PDF file
        const headers = Object.keys(data[0]);
        const rows = data.map((item) => Object.values(item).map((value) => formatValue(value)));
    
        function formatValue(value) {
          if (typeof value === 'number') {
            const stringValue = value.toString();
            if (stringValue.includes('e+')) {
              const [coefficient, exponent] = stringValue.split('e+');
              const formattedNumber = Number(coefficient).toFixed(Number(exponent));
              return formattedNumber;
            }
          } else if (typeof value === 'string' && /^\d+(\.\d+)?[Ee]\+\d+$/.test(value)) {
            return `"${value}"`;
          }
          return value;
        }
    
        const documentDefinition = {
          content: [
            {
              pageSize: 'A4',
              table: {
                headerRows: 1,
                body: [headers, ...rows],
              },
              widths: Array.from({ length: headers.length }, () => '*'),
              style: {
                fontSize: 5,
              },
              layout: {
                fillColor: function (rowIndex, node, columnIndex) {
                  return rowIndex === 0 ? '#CCCCCC' : null;
                },
              },
            },
          ],
        };
    
        pdfMake.createPdf(documentDefinition).download(this.statusname);
      }
    });    
    
  }  

   
  onDropdownChange() {
    this.getExactDate();
    if (this.selectedOption === "Custom") {
      setTimeout(() => {
        this.picker.open()
      });
    }
  }

  getExactDate() {
    let date: string | null = null;
    switch (this.selectedOption) {
      case 'Today':
        date = this.datePipe.transform(new Date(), 'yyyy-MM-dd');
        this.startDate = date;
        this.endDate = date;
        console.log(date);
        break;
      case 'This week':
        const currentWeek = new Date();
        // this.startDate = this.datePipe.transform(new Date(), 'yyyy-MM-dd');
        // this.endDate = this.datePipe.transform(new Date(new Date().getTime() + 6 * 24 * 60 * 60 * 1000), 'yyyy-MM-dd');
        this.startDate = this.datePipe.transform(new Date(currentWeek.setDate(currentWeek.getDate() - currentWeek.getDay())), 'yyyy-MM-dd');
        this.endDate = this.datePipe.transform(new Date(currentWeek.setDate(currentWeek.getDate() - currentWeek.getDay() + 6)), 'yyyy-MM-dd');
        date = `${this.startDate} - ${this.endDate}`;
        console.log(date);
        break;
      case 'This month':
        const currentDate = new Date();
        this.startDate = this.datePipe.transform(new Date(currentDate.getFullYear(), currentDate.getMonth(), 1), 'yyyy-MM-dd');
        this.endDate = this.datePipe.transform(new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 0), 'yyyy-MM-dd');
        date = `${this.startDate} - ${this.endDate}`;
        console.log(date);
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
        console.log(date);
        break;
      default:
        date = '';
        break;
    }
    this.selectedDate = (date ?? '')
    // return date ?? '';
    this.getDistributorCount();
    this.getToatlProposals()
  }

  getCurrentQuarter(): Date {
    const currentDate = new Date();
    const quarter = Math.floor(currentDate.getMonth() / 3);
    const startOfQuarter = new Date(currentDate.getFullYear(), quarter * 3, 1);
    return startOfQuarter;
  }

  formatDateEvent(value: string, controlName: string): void {
    const control = this.range.get(controlName);
    const parsedDate = moment(value, 'YYYY-MM-DD', false);
    if (control && parsedDate.isValid()) {
      control.setValue(parsedDate.toDate());
      if (controlName === 'start') {
        this.startDate = this.datePipe.transform(new Date(control.value), 'yyyy-MM-dd');
        console.log(this.startDate);
      } else {
        this.endDate = this.datePipe.transform(new Date(control.value), 'yyyy-MM-dd');
        console.log(this.endDate);
        this.getDistributorCount();
        this.getToatlProposals()
      }
    }
  }

  getFormattedDate(date: Date): string {
    if (!date) {
      return '';
    }

    const formattedDate = moment(date).format('MMM DD');
    return formattedDate;
  }

  getFormattedDateRange(): string {
    const start = this.range?.get('start')?.value;
    const end = this.range?.get('end')?.value;
    if (!start || !end) {
      return '';
    }
    const formattedStart = moment(start).format('MMM DD');
    const formattedEnd = moment(end).format('MMM DD');
    return `${formattedStart} - ${formattedEnd}`;
  }

  navigateToPdfDownload(){
    this.dialog.open(PdfReportDownloadPopupComponent)
    // this.dialog.open(DatePickerPopupComponent)
  }
}
