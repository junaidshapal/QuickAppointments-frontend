import { Component, Input, OnInit } from '@angular/core';
import { AdminService } from '../services/admin.service';
import { Availability } from '../../models/availability.model';

@Component({
  selector: 'app-doctor-availability',
  templateUrl: './doctor-availability.component.html'
})
export class DoctorAvailabilityComponent implements OnInit {
  @Input() doctorId!: string;
  availabilities: Availability[] = [];
  loading: boolean = true;

  constructor(private adminService: AdminService) {}

  ngOnInit() {
    this.loadAvailability();
  }

  loadAvailability() {
    this.adminService.getDoctorAvailability(this.doctorId).subscribe({
      next: (data) => {
        debugger
        this.availabilities = data;
        this.loading = false;
      },
      error: (err) => {
        console.error('Error fetching availability:', err);
        this.loading = false;
      }
    });
  }

  cancelAppointment(availabilityId: number) {
    if (confirm('Are you sure you want to cancel this availability?')) {
      this.adminService.deleteDoctorAvailability(availabilityId).subscribe({
        next: () => {
          alert('Availability canceled.');
          this.loadAvailability();
        },
        error: (err) => console.error('Error canceling availability:', err)
      });
    }
  }
}
