import { Component, OnInit } from '@angular/core';
import { AdminService } from '../services/admin.service';

@Component({
  selector: 'app-admin-dashboard',
  templateUrl: './admin-dashboard.component.html',
  styleUrls: ['./admin-dashboard.component.css']
})
export class AdminDashboardComponent implements OnInit {
  totalUsers: number = 0;
  totalDoctors: number = 0;
  totalAppointments: number = 0;
  upcomingAppointments: any[] = [];

  constructor(private adminService: AdminService) {}

  ngOnInit() {
    this.loadDashboardData();
  }

  loadDashboardData() {
    // Fetch total users
    this.adminService.getAllUsers().subscribe(users => {
      this.totalUsers = users.length;
      this.totalDoctors = users.filter((u: any) => u.role === 'Doctor').length;
    });

    // Fetch total appointments
    this.adminService.getAllAppointments().subscribe(appointments => {
      this.totalAppointments = appointments.length;
      this.upcomingAppointments = appointments.filter((a: any) => a.status === 'Pending');
    });
  }
}
