import { Injectable } from '@angular/core';
import { CanActivate, Router, ActivatedRouteSnapshot } from '@angular/router';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  constructor(private authService: AuthService, private router: Router) {}

  canActivate(route: ActivatedRouteSnapshot): boolean {
    const expectedRole = route.data['expectedRole']; // Get expected role from route data
    const userRole = this.authService.getRole(); // Get logged-in user's role

    if (this.authService.isAuthenticated()) {
      if (!expectedRole || userRole === expectedRole) {
        return true; // Grant access if no specific role is required OR the role matches
      }
      this.router.navigate(['/']); // Redirect if role does not match
      return false;
    }

    this.router.navigate(['/login']); // Redirect if not authenticated
    return false;
  }
}
