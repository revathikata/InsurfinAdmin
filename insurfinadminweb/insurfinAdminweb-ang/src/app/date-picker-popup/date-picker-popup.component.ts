import { DatePipe } from '@angular/common';
import { Component, ElementRef, ViewChild } from '@angular/core';
import { FormGroup, FormControl, FormBuilder, Validators } from '@angular/forms';
import { MatDateRangePicker } from '@angular/material/datepicker';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import moment from 'moment';

@Component({
  selector: 'app-date-picker-popup',
  templateUrl: './date-picker-popup.component.html',
  styleUrls: ['./date-picker-popup.component.css']
})
export class DatePickerPopupComponent {

  @ViewChild('datepickerInput') datepickerInput: ElementRef;
  @ViewChild('picker') picker: MatDateRangePicker<Date>
  startDate: string | null;
  endDate: string | null;
  range = new FormGroup({
    start: new FormControl(),
    end: new FormControl(),
  });

  constructor(private datePipe: DatePipe,private formBuilder: FormBuilder ,private dialog:MatDialog)
  { this.range = this.formBuilder.group({
     start: [null, Validators.required],
     end: [null, Validators.required]
   });
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
        // this.distributorDashboardDetails();
      }
    }
  }

}
