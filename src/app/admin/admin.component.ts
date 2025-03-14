import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../Auth/auth.service';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
})
export class AdminComponent implements OnInit {
  constructor(private authService: AuthService, private router: Router) {}

  ngOnInit(): void {
    // Check if user is an Admin
    if (!this.authService.isAdmin()) {
      console.warn("Unauthorized access attempt to admin panel.");
      this.router.navigate(['/login']); // Redirect if not an admin
    }
  }

  logout(): void {
    this.authService.logout();
  }
}
