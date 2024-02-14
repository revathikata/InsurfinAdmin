import { Component } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-filter-sorting',
  templateUrl: './filter-sorting.component.html',
  styleUrls: ['./filter-sorting.component.css']
})
export class FilterSortingComponent {

  constructor(private dialogRef:MatDialogRef<any>){

  }
  onClose(){
    this.dialogRef.close()
  }

}
