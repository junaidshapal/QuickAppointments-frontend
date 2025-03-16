import { Injectable, Inject, PLATFORM_ID } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { JwtHelperService } from '@auth0/angular-jwt';
import { jwtDecode } from 'jwt-decode';
import { Router } from '@angular/router';
import { isPlatformBrowser } from '@angular/common';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private apiUrl = 'https://localhost:7249/api/Auth';
  private tokenKey = 'jwtToken';
  private roleKey = 'userRole';

  constructor(
    private http: HttpClient,
    private jwtHelper: JwtHelperService,
    private router: Router,
    @Inject(PLATFORM_ID) private platformId: any
  ) {}

  // Register User
  register(user: any): Observable<any> {
    return this.http.post(`${this.apiUrl}/register`, user).pipe(
      map(response => {
        console.log('Registration successful:', response);
        return response;
      }),
      catchError(error => {
        console.error('Registration error:', error);
        return throwError(() => error);
      })
    );
  }

  // Login User
  // login(credentials: any): Observable<any> {
  //   return this.http.post(`${this.apiUrl}/login`, credentials).pipe(
  //     map((response: any) => {
  //       console.log('Login successful:', response);
  //       if (response.token) {
  //         this.saveToken(response.token);
  //         this.redirectAfterLogin();
  //       }
  //       return response;
  //     }),
  //     catchError(err => {
  //       console.error('Login error:', err);
  //       return throwError(() => err);
  //     })
  //   );
  // }
  login(credentials: any): Observable<any> {
    return this.http.post(`${this.apiUrl}/login`, credentials).pipe(
      map((response: any) => {
        if (response.token) {
          this.saveToken(response.token);
  
          // **Ensure immediate role-based redirection**
          setTimeout(() => {
            const role = this.getRole();
            console.log('Redirecting role:', role);  // Debugging log
  
            if (role === 'Admin') {
              this.router.navigate(['/admin/dashboard']);
            } else if (role === 'Doctor') {
              this.router.navigate(['/dashboard']);
            } else {
              this.router.navigate(['/dashboard']);
            }
          }, 500); // **Delay to ensure token is fully saved**
        }
        return response;
      }),
      catchError((err) => {
        console.error('Login error:', err);
        return throwError(() => err);
      })
    );
  }
  
  

  // Redirect User Based on Role
  // private redirectAfterLogin(): void {
  //   const role = this.getRole();
  //   if (role === 'Admin') {
  //     this.router.navigate(['/admin/dashboard']);
  //   } else if (role === 'Doctor') {
  //     this.router.navigate(['/doctor-dashboard']);
  //   } else {
  //     this.router.navigate(['/dashboard']);
  //   }
  // }

  // Get Role from JWT Token
  getRole(): string | null {
    const token = this.getToken();
    if (token) {
      try {
        const decodedToken: any = jwtDecode(token);
        return decodedToken?.['http://schemas.microsoft.com/ws/2008/06/identity/claims/role'] || null;
      } catch (error) {
        console.error('Error decoding token:', error);
        return null;
      }
    }
    return null;
  }

  // Get Logged-in User ID from JWT
  getUserId(): string | null {
    const token = this.getToken();
    if (token) {
      try {
        const decodedToken: any = jwtDecode(token);
        return decodedToken?.['http://schemas.xmlsoap.org/ws/2005/05/identity/claims/nameidentifier'] || null;
      } catch (error) {
        console.error('Error decoding token:', error);
        return null;
      }
    }
    return null;
  }

  // Get User Details from JWT
  getUserDetails(): any | null {
    const token = this.getToken();
    if (token) {
      try {
        return jwtDecode(token);
      } catch (error) {
        console.error('Error decoding token:', error);
        return null;
      }
    }
    return null;
  }

  // Save Token to Local Storage
  private saveToken(token: string): void {
    if (isPlatformBrowser(this.platformId)) {
      localStorage.setItem(this.tokenKey, token);

      // Decode token and store role
      const decodedToken = jwtDecode<any>(token);
      const role = decodedToken?.['http://schemas.microsoft.com/ws/2008/06/identity/claims/role'];

      if (role) {
        localStorage.setItem(this.roleKey, role);
      }
    }
  }

  // Logout User
  logout(): void {
    if (isPlatformBrowser(this.platformId)) {
      localStorage.removeItem(this.tokenKey);
      localStorage.removeItem(this.roleKey);
    }
    this.router.navigate(['/login']).then(() => {
      window.location.reload();
    });
  }

  // Check if User is Authenticated
  isAuthenticated(): boolean {
    const token = this.getToken();
    return token ? !this.jwtHelper.isTokenExpired(token) : false;
  }

  // Check if User is Admin
  isAdmin(): boolean {
    return this.getRole() === 'Admin';
  }

  // Get Token from Local Storage
  getToken(): string | null {
    return isPlatformBrowser(this.platformId) ? localStorage.getItem(this.tokenKey) : null;
  }
}
