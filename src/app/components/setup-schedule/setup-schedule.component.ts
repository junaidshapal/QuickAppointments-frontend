import { Component, OnInit } from '@angular/core';
import { AvailabilityService } from '../../services/availability.service';
import { Availability } from '../../models/availability.model';
import { AuthService } from '../../Auth/auth.service';

@Component({
  selector: 'app-setup-schedule',
  templateUrl: './setup-schedule.component.html'
})
export class SetupScheduleComponent implements OnInit {
  availability: Availability = {
    id: 0, 
    doctorId: '',
    availableDate: '',
    startTime: '',
    endTime: ''
  };

  constructor(
    private availabilityService: AvailabilityService,
    private authService: AuthService
  ) {}

  ngOnInit() {
    // Get the logged-in doctor's ID (should return a string GUID)
    const doctorId: string | null = this.authService.getUserId();
    if (doctorId) {
      this.availability.doctorId = doctorId;
      console.log('Logged-in Doctor ID:', doctorId);
    } else {
      console.error('Doctor ID not found! Please log in again.');
      alert('Doctor ID not found. Please log in again.');
    }
  }

  setAvailability() {
    if (!this.availability.doctorId) {
      alert('Doctor ID not found. Please log in again.');
      return;
    }

    console.log('Submitting Availability:', this.availability);

    this.availabilityService.addAvailability(this.availability).subscribe({
      next: (response) => {
        console.log("API Response:", response); // Log response for debugging
        if (response.message) {
          alert(response.message); // Correctly access response message
        } else {
          alert('Availability set successfully.');
        }
        this.resetForm();
      },
      error: (err) => {
        console.error('Error setting availability:', err);
        alert('Failed to set availability. Please try again.');
      }
    });
  }

  resetForm() {
    this.availability.availableDate = '';
    this.availability.startTime = '';
    this.availability.endTime = '';
  }
}
