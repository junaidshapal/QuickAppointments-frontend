import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'QuickAppointments';

  constructor(public router:Router){}

  showNavbar(){
    const cuurentRoute = this.router.url;
    return cuurentRoute !== '/login' && cuurentRoute !== '/signup';
  }
}
