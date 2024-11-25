import { Component } from '@angular/core';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.css'
})
export class NavbarComponent {
  navLinks = [
    { name: 'Home', route: '/home' },
    { name: 'About', route: '/about' },
    { name: 'Services', route: '/services' },
    { name: 'Contact', route: '/contact' },
  ];

  selectedLink = this.navLinks[0]; // Default to first link

  selectLink(link: any) {
    this.selectedLink = link;
  }
}
