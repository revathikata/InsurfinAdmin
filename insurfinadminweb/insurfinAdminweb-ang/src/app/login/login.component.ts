import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { NgxOtpInputConfig } from 'ngx-otp-input';
import { LoginServiceService } from '../Services/login-service.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent {
  otpForm!: FormGroup;
  form!: FormGroup;
  // email! :FormGroup
  isValid = false;
  email: any;
  password: any;
  loginForm!: FormGroup;
  otpInputConfig: NgxOtpInputConfig = {
    otpLength: 6,
    autofocus: true,
    classList: {
      inputBox: 'otps',
      input: 'my-super-class',
      inputFilled: 'my-super-filled-class',
      inputDisabled: 'my-super-disabled-class',
      inputSuccess: 'my-super-success-class',
      inputError: 'my-super-error-class',
    },
  };
  otpfill: any;
  message: any;
  // @ViewChild('ngOtpInput') ngOtpInputRef:any;
  constructor(
    private formBuilder: FormBuilder,
    private http: HttpClient,
    private router: Router,
    private loginService: LoginServiceService
  ) {}

  ngOnInit(): void {
    this.loginForm = this.formBuilder.group({
      // phonenumber:["",[Validators.required,Validators.pattern("^[0-9]{10}")]],
      email: [
        '',
        [
          Validators.required,
          Validators.email,
          Validators.pattern('^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$'),
        ],
      ],
      // otp: ["", Validators.required]
      password: ['', Validators.required],
    });
  }
  contnw() {
    const data = {
      phoneNumber: this.loginForm.controls['phonenumber'].value,
      role: 'ADMIN',
    };
    this.loginService.signup(data).subscribe((res: any) => {
      localStorage.setItem('session', JSON.stringify(res?.data.accessToken));
      console.log(res);
      this.isValid = true;
    });
  }
  handleOtp(ot: any) {
    console.log('otpcheck', ot);
    if (parseInt(ot) == 123456) {
      alert('success');
    } else {
      alert('your otp is wrong');
    }
  }
  handleFill(value: any) {
    console.log('otpcheckk', value);
    this.otpfill = value;
    console.log(this.otpfill, 'oo');
  }

  // otp(){
  //   if (this.otpForm.valid) {
  //     console.log(this.otpForm.value);
  //   } else {
  //     for (const control of Object.keys(this.otpForm.controls)) {
  //       this.otpForm.controls[control].markAsTouched();
  //     }
  //     return;
  //   }
  // }
  loginbtn() {
    // localStorage.setItem(
    //   'email',
    //   JSON.stringify(this.loginForm.controls['email'].value)
    // );
    // let headers = new HttpHeaders();
    // headers = headers.set('Authorization', 'Basic ');
    const data = {
      email: this.loginForm.controls['email'].value,
      role:'ADMIN',
      password: this.loginForm.controls['password'].value,
    };
    this.loginService.loginWithPassword(data).subscribe((res: any) => {
      if (res?.error == false) {
        sessionStorage.setItem('loginDetails', JSON.stringify(res?.data.accessToken));
        sessionStorage.setItem('AdminUuid', JSON.stringify(res?.data.uuid))
        sessionStorage.setItem('refreshToken', JSON.stringify(res?.data.refreshToken))
        this.router.navigate(['./dashboard']);
        setTimeout(function(){
          window.location.reload();
        }, 1000);
      } else {
        this.message = res?.message;
      }
  //     localStorage.setItem(
  //       'loginDetails',
  //       JSON.stringify(res?.data.accessToken)
  //     );
  //     console.log(
  //       this.loginForm.controls['email'].value,
  //       this.loginForm.controls['password'].value,
  //       'gh'
  //     );
  //     setTimeout(function(){
  //       window.location.reload();
  //     }, 3000);
  //   });
  // }
})
  }}
