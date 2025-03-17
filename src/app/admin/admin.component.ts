import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../Auth/auth.service';
import { TopbarComponent } from '../components/topbar/topbar.component';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
})
export class AdminComponent implements OnInit {
  constructor(private authService: AuthService, private router: Router) {}
  isSidebarOpen: boolean = true;

  ngOnInit(): void {
    // Check if user is an Admin
    if (!this.authService.isAdmin()) {
      console.warn("Unauthorized access attempt to admin panel.");
      this.router.navigate(['/login']); // Redirect if not an admin
    }
  }

  toggleSidebar() {
    this.isSidebarOpen = !this.isSidebarOpen;
  }
  
  logout(): void {
    this.authService.logout();
  }
}
