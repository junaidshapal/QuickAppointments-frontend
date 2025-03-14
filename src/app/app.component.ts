import { Component, OnInit } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';
import { AuthService } from './Auth/auth.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  showNavbar = true; // Controls the sidebar visibility
  isAdmin = false;

  constructor(private router: Router, private authService: AuthService) {}

  // ngOnInit(): void {
  //   this.updateNavbarVisibility(this.router.url);

  //   this.router.events.subscribe(event => {
  //     if (event instanceof NavigationEnd) {
  //       this.updateNavbarVisibility(event.url);
  //     }
  //   });
  // }

  ngOnInit(): void {
    this.updateLayout(this.router.url);

    this.router.events.subscribe(event => {
      if (event instanceof NavigationEnd) {
        this.updateLayout(event.url);
      }
    });
  }

  // private updateNavbarVisibility(url: string): void {
  //   const authPages = ['/login', '/signup']; // Routes where navbar should be hidden
  //   this.showNavbar = !authPages.includes(url); // Hide sidebar but keep topbar
  // }

  private updateLayout(url: string): void {
    const authPages = ['/login', '/signup']; // Pages where navbar should be hidden

    // Check if current route belongs to Admin
    this.isAdmin = this.authService.isAdmin();

    // Hide navbar on auth pages OR if admin is logged in
    this.showNavbar = !authPages.includes(url) && !this.isAdmin;
  }
}
