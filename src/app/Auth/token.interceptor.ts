import { Injectable } from '@angular/core';
import {
  HttpInterceptor,
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpErrorResponse,
} from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { AuthService } from './auth.service';
import { JwtHelperService } from '@auth0/angular-jwt';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {
  constructor(
    private authService: AuthService,
    private jwtHelper: JwtHelperService
  ) {}

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    let authReq = req; // Default request

    const token = this.authService.getToken();
    //console.log('Intercepting request:', req.url, 'Token:', token);

    // Attach Authorization header if token exists
    if (token && !this.jwtHelper.isTokenExpired(token)) {
      authReq = req.clone({
        setHeaders: {
          Authorization: `Bearer ${token}`,
        },
      });
    } else if (token && this.jwtHelper.isTokenExpired(token)) {
      console.warn('Token expired. Logging out user.');
      this.authService.logout();
    }

    return next.handle(authReq).pipe(
      catchError((error) => this.handleAuthError(error))
    );
  }

  // Handle Unauthorized Errors (401, 403)
  private handleAuthError(error: HttpErrorResponse): Observable<HttpEvent<any>> {
    if (error.status === 401 || error.status === 403) {
      console.error('Unauthorized request detected. Logging out.');
      this.authService.logout();
    }
    return throwError(() => error);
  }
}
