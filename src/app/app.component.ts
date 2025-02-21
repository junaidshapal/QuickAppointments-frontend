import { Component, OnInit } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  showNavbar = true; // Controls the sidebar visibility

  constructor(private router: Router) {}

  ngOnInit(): void {
    this.updateNavbarVisibility(this.router.url);

    this.router.events.subscribe(event => {
      if (event instanceof NavigationEnd) {
        this.updateNavbarVisibility(event.url);
      }
    });
  }

  private updateNavbarVisibility(url: string): void {
    const authPages = ['/login', '/signup']; // Routes where navbar should be hidden
    this.showNavbar = !authPages.includes(url); // Hide sidebar but keep topbar
  }
}
