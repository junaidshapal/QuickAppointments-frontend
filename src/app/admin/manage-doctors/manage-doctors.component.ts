import { Component, OnInit } from '@angular/core';
import { AdminService } from '../services/admin.service';
import { User } from '../../models/user.model';
import { Router } from '@angular/router';

@Component({
  selector: 'app-manage-doctors',
  templateUrl: './manage-doctors.component.html'
})
export class ManageDoctorsComponent implements OnInit {
  doctors: User[] = [];
  loading: boolean = true;

  constructor(private adminService: AdminService,private router: Router) {}

  ngOnInit() {
    this.loadDoctors();
  }

  loadDoctors() {
    this.adminService.getAllDoctors().subscribe({
      next: (data) => {
        this.doctors = data;
        this.loading = false;
      },
      error: (err) => {
        console.error('Error fetching doctors:', err);
        this.loading = false;
      }
    });
  }

  // 🛠 **New Method to Navigate to Doctor Availability**
  viewAvailability(doctorId: string) {
    console.log(`Navigating to availability for doctor ID: ${doctorId}`);
    this.router.navigate(['/admin/doctor-availability', doctorId]);
  }
}
