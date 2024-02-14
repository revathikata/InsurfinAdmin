import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HttpErrorResponse
} from '@angular/common/http';
import { Observable ,tap,catchError,throwError, switchMap } from 'rxjs';
import { LoginServiceService } from './Services/login-service.service';
import { Router } from '@angular/router';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {
  refersToken: any;
  userId: any;

  constructor(private router: Router, private loginService: LoginServiceService) {}

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    if (sessionStorage.getItem("loginDetails")) {
      let idToken;
        idToken = JSON.parse(sessionStorage.getItem("loginDetails") ?? '');
        const cloned = request.clone({
          headers: request.headers.set("Authorization", "Bearer " + idToken)
        });
  
      return next.handle(cloned).pipe(
        catchError((err: any) => {
          if (err instanceof HttpErrorResponse && (err.status === 401 || err.status === 403)) {
            sessionStorage.removeItem('loginDetails');
            return this.refreshTokenAndRetry(request, next);
          }
          return throwError(err);
        })
      );
    } else {
      return next.handle(request);
    }
  }
  private tokenRefreshing = false;
  refreshTokenAndRetry(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    if (!this.tokenRefreshing) {
      this.tokenRefreshing = true;
      return this.RefreshToken().pipe(
        switchMap(() => {
          const idToken = JSON.parse(sessionStorage.getItem("loginDetails") ?? 'null');
          console.log(idToken,'idt');
          
          const cloned = request.clone({
            headers: request.headers.set("Authorization", "Bearer " + idToken)
          });
          return next.handle(cloned);
        }),
        catchError((error: any) => {
          this.tokenRefreshing = false;
          sessionStorage.removeItem('loginDetails');
          sessionStorage.clear();
          this.router.navigate(['login']);
          window.location.reload();
          return throwError(error);
        })
      );
    } else {
      // If already refreshing the token, wait and retry after refreshing
      return next.handle(request);
    }
  }
  RefreshToken(): Observable<any> {
    this.refersToken = JSON.parse(sessionStorage.getItem('refreshToken') ?? 'null');
    this.userId = JSON.parse(sessionStorage.getItem('AdminUuid') ?? 'null');
  
    const data = {
      refreshToken: this.refersToken,
      userId: this.userId
    };
  
    return this.loginService.refreshAccessToken(data).pipe(
      tap((res: any) => {
        if (res && res.error === false) {
          sessionStorage.setItem('loginDetails', JSON.stringify(res.data.accessToken));
          console.log(res.data.accessToken,'settken');
        }
        this.tokenRefreshing = false;
      })
    );
  }
}
