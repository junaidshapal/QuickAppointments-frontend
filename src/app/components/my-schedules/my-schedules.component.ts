import { Component, OnInit } from '@angular/core';
import { AvailabilityService } from '../../services/availability.service';
import { Availability } from '../../models/availability.model';
import { AuthService } from '../../Auth/auth.service';

@Component({
  selector: 'app-my-schedules',
  templateUrl: './my-schedules.component.html'
})
export class MySchedulesComponent implements OnInit {
  availabilities: Availability[] = [];
  doctorId: string = ''; // Updated to GUID

  constructor(
    private availabilityService: AvailabilityService,
    private authService: AuthService // Inject AuthService to get logged-in doctor
  ) {}

  ngOnInit() {
    this.getLoggedInDoctorId();
  }

  getLoggedInDoctorId() {
    const userId = this.authService.getUserId(); // Fetch user ID from JWT Token
    if (userId) {
      this.doctorId = userId;
    } else {
      console.error('Doctor ID not found in JWT.');
    }
    console.log('Logged-in Doctor ID:', this.doctorId);

    if (this.doctorId) {
      this.fetchAvailability();
    } else {
      console.error('Doctor ID not found in JWT.');
    }
  }

  fetchAvailability() {
    this.availabilityService.getAvailabilityByDoctor(this.doctorId).subscribe({
      next: (data) => {
        console.log('Fetched availability:', data);
        this.availabilities = data;
      },
      error: (err) => console.error('Error fetching availability:', err),
    });
  }
}
