import { Component, HostListener } from '@angular/core';
import { AuthService } from '../../Auth/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-topbar',
  templateUrl: './topbar.component.html',
  styleUrls: ['./topbar.component.css']
})
export class TopbarComponent {
  isDropdownOpen = false;

  constructor(private authService:AuthService, private router:Router) {}

  //Toggle dropdown visibility
  toggleDropdown() {
    this.isDropdownOpen = !this.isDropdownOpen;
  }

  //Close the dropdown when clicking outside
  @HostListener('document:click', ['$event'])
  onDocumentClick(event: MouseEvent) {
    const target = event.target as HTMLElement;
    const isInsideDropdown = target.closest('.relative');
    if (!isInsideDropdown) {
      this.isDropdownOpen = false;
    }
  }

  //Handle logout logic
  logout() {
    this.authService.logout();  // Clears token from localStorage
    this.router.navigate(['/login']); // Redirects to login page
  }
}
