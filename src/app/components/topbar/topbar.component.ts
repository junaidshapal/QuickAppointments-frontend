import { Component, HostListener } from '@angular/core';

@Component({
  selector: 'app-topbar',
  templateUrl: './topbar.component.html',
  styleUrls: ['./topbar.component.css']
})
export class TopbarComponent {
  isDropdownOpen = false;

  

  //Handle logout logic
  logout() {
    console.log('User logged out');
  }
}
