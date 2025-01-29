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

  Login User
  login(credentials: any): Observable<any> {
    return this.http.post(`${this.apiUrl}/login`, credentials).pipe(
      map((response: any) => {
        console.log('Login successful:', response);
        if (response.token) {
          this.saveToken(response.token);
        }
        return response;
      }),
      catchError((err) => {
        console.error('Login error:', err);
        return throwError(() => err);
      })
    );
  }

  //Get Role from JWT
  getRole(): string | null {
    const token = this.getToken();
    if (token) {
      try {
        const decodedToken = (jwtDecode as any)(token);
        return decodedToken['http://schemas.microsoft.com/ws/2008/06/identity/claims/role'] || null;
      } catch (error) {
        console.error('Error decoding token:', error);
        return null;
      }
    }
    return null;
  }

  //Save Token to Local Storage
  saveToken(token: string): void {
    localStorage.setItem(this.tokenKey, token);
  }

  //Logout User
  logout(): void {
    localStorage.removeItem(this.tokenKey); // Clear JWT
    console.log('User logged out successfully');
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
