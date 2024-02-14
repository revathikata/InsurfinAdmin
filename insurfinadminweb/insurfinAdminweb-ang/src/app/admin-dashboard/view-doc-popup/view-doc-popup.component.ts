import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialog } from '@angular/material/dialog';
import { AdminServiceService } from '../../Services/admin-service.service';

@Component({
  selector: 'app-view-doc-popup',
  templateUrl: './view-doc-popup.component.html',
  styleUrls: ['./view-doc-popup.component.css']
})
export class ViewDocPopupComponent {
  viewtable : any = [
    {distributorName:'distributorName', contact:'phoneNumber',email:'anil@gmail.com',addressLine1:'addressLine1',address2:'1-3-4,tk street',city:'city',state:'state',pinCode:'pinCode'}
  ]
  viewSelectedtablerow: any;
  // viewtable: any ;

  constructor(public dialog: MatDialog,
    public distributerService: AdminServiceService,
    @Inject(MAT_DIALOG_DATA) public data: any) {}
  
  ngOnInit(): void {
    // this.viewDistributer()
    this.viewSelectedtablerow = this.data;
    // console.log('vwtb',this.viewSelectedtablerow);
  }
  // viewDistributer(){
  //   this.distributerService.distributerStatus().subscribe((res: any) =>{
  //     this.viewTable = res
  //     console.log('table',this.viewTable);
  //   })
  // }
}
