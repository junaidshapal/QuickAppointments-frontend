import { Component } from '@angular/core';
import { faBars, faTimes, faHome, faInfoCircle, faCog, faPhone, faUser, faUserCheck, faClipboardList, faAmbulance, faCalendarAlt, faClipboardUser, faUserMd, faBuilding, faPlusCircle } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent {
  // FontAwesome icons
  faBars = faBars;
  faTimes = faTimes;

  //Sidebar toggle state
  isSidebarOpen = true;

  // Navigation links
  navLinks = [
    { name: 'Dashboard', route: '/dashboard', icon: faHome }, 
    { name: 'Users', route: '/users-management', icon: faUser },
    { name: 'Appointment', route: '/appointments', icon: faClipboardList },
    { name: 'Roles', route: '/roles-management', icon: faUserCheck }, 
    { name: 'Schedule', route: '/setup-schedule', icon: faCalendarAlt },
    { name: 'My-Schedules', route: '/my-schedules', icon: faClipboardUser }, 
    { name: 'Doctor', route: '/doctors-list', icon: faUserMd }, 
    { name: 'Departments', route: '/departments', icon: faBuilding }, 
    { name: 'Add Department', route: '/add-department', icon: faPlusCircle }
];

  // Toggle sidebar visibility
  toggleSidebar() {
    this.isSidebarOpen = !this.isSidebarOpen;
  }
}
