import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { JwtHelperService } from '@auth0/angular-jwt';
import { jwtDecode } from 'jwt-decode';
import { catchError, map, Observable, throwError } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private apiUrl = 'https://localhost:7249/api/Auth';
  constructor(private http: HttpClient, private jwtHelper: JwtHelperService) {}

  // Register User
  register(user: any): Observable<any> {
    return this.http.post(`${this.apiUrl}/register`, user);
  }

  login(credentials: any): Observable<any> {
    return this.http.post(`${this.apiUrl}/login`, credentials).pipe(
      map((response: any) => {
        console.log('Login successful', response);
        if (response.token) {
          localStorage.setItem('jwtToken', response.token);
        }
        return response;
      }),
      catchError((err) => {
        console.error('Login error:', err);
        return throwError(err);
      })
    );
  }

  getRole():string | null{
    const token = localStorage.getItem('token');
    if(token){
      const decodedToken: any = jwtDecode(token);
      return decodedToken['http://schemas.microsoft.com/ws/2008/06/identity/claims/role']
    }
    return null;
  }

  saveToken(token:string){
    localStorage.setItem('token', token);
  }

   // Logout User
   logout(): void {
    localStorage.removeItem('jwtToken');
  }


  isAuthenticated(): boolean {
    return !!localStorage.getItem('jwtToken');
  }
  

  // Get token
  getToken(): string | null {
    return localStorage.getItem('jwtToken');
  }
}
