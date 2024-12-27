import { Component } from '@angular/core';
import { faBars, faTimes, faHome, faInfoCircle, faCog, faPhone, faUser, faUserCheck, faClipboardList, faAmbulance } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent {
  // FontAwesome icons
  faBars = faBars;
  faTimes = faTimes;

  
  // Toggle sidebar visibility
  toggleSidebar() {
    this.isSidebarOpen = !this.isSidebarOpen;
  }
}
