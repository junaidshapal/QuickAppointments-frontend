import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { JwtHelperService } from '@auth0/angular-jwt';
import * as jwtDecode from 'jwt-decode';
import { Observable, throwError } from 'rxjs';
import { catchError, map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private apiUrl = 'https://localhost:7249/api/Auth';
  private tokenKey = 'jwtToken'; //Key for storing JWT(Json Web Token) in local storage

  constructor(private http: HttpClient, private jwtHelper: JwtHelperService) {}

  //Register User
  register(user: any): Observable<any> {
    return this.http.post(`${this.apiUrl}/register`, user).pipe(
      map((response) => {
        console.log('Registration successful:', response);
        return response;
      }),
      catchError((error) => {
        console.error('Registration error:', error);
        return throwError(() => error);
      })
    );
  }

  

  //Check if User is Authenticated
  isAuthenticated(): boolean {
    const token = this.getToken();
    return token ? !this.jwtHelper.isTokenExpired(token) : false;
  }

  //Get Token from Local Storage
  getToken(): string | null {
    return localStorage.getItem(this.tokenKey);
  }

  //Decode JWT Token (Optional Helper)
  decodeToken(): any | null {
    const token = this.getToken();
    if (token) {
      try {
        return (jwtDecode as any)(token);
      } catch (error) {
        console.error('Error decoding token:', error);
        return null;
      }
    }
    return null;
  }
}
