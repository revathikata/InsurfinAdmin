import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Observable, of } from 'rxjs';
import { environment } from 'src/environments/environment.development';
@Injectable({
  providedIn: 'root'
})
export class LoginServiceService {
  userurl = environment.signup;
  constructor(private http: HttpClient, private router: Router,) { }
  
  public getHeader(){
    const accessToken = JSON.parse(sessionStorage.getItem('loginDetails')?? '');
    const headers = {
      'session' : 'Bearer '+ accessToken,
      // 'userId' : loginDetails.userId
    }
    return headers;
  }
  loginWithPassword(data:any){
    return this.http.post(this.userurl + `loginWithPassword`,data)
  }
  public signup(data:any){
    return this.http.post<any>(this.userurl + `signUp`,data);
    // http://65.0.58.72:8085/api/signUp
  }
  refreshAccessToken(data){
    return this.http.post(this.userurl +'renewAccessToken',data);
  }
  isAuthenticated(): Observable<boolean> {
    const token = sessionStorage.getItem('loginDetails');
    return of(!!token && token !== 'null' && token.trim() !== '');
  }  
}
