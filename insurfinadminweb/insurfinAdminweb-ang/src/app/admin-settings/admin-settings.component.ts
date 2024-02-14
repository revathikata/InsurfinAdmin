import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-admin-settings',
  templateUrl: './admin-settings.component.html',
  styleUrls: ['./admin-settings.component.css']
})
export class AdminSettingsComponent {
  adminForm!: FormGroup;
  allvalue : any;


  constructor(private formBuilder: FormBuilder,) { }
  ngOnInit(): void {
    this.adminForm = this.formBuilder.group({
      name: ["", Validators.required],
      email: ["", [Validators.required, Validators.email, Validators.pattern("^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$")]],
      contactnum: ["", [Validators.required, Validators.pattern("^((\\+91-?)|0)?[0-9]{10}$")]],
      roles: ["", Validators.required]

    })
  }
  get name() {
    return this.adminForm.get('name')!;
  }

  get email() {
    return this.adminForm.get('email')!;
  }

  get contactnum() {
    return this.adminForm.get('contactnum')!;
  }

  get roles() {
    return this.adminForm.get('roles')!;
  }
  validate(){
    if (this.adminForm.valid) {
      console.log(this.adminForm.value);
    }
    else{
      
      for (const control of Object.keys(this.adminForm.controls)) {
        this.adminForm.controls[control].markAsTouched();
      }
      return;
}
  }


}
