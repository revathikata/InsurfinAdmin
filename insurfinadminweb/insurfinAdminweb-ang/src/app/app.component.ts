import { Component } from '@angular/core';
import { Observable, Subscription } from 'rxjs';
import { LoginServiceService } from './Services/login-service.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'insurfinAdminweb-ang';
  sideNav = 5;
  sidebarClosed = false;

  isAuthenticated: Observable<boolean>;
  constructor(private auth: LoginServiceService) {
    this.isAuthenticated = this.auth.isAuthenticated();
    this.isAuthenticated.subscribe((isAuth:any) => console.log('isAuthenticated:', isAuth));
  }

  increaseMenu() {
    this.sidebarClosed = true;
    this.sideNav =  10 ;
  }

  decreaseMenu() {
    this.sidebarClosed = false;
    this.sideNav = 5 ;
  }
}
