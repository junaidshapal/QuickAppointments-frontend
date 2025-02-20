import { Component } from '@angular/core';
import { AvailabilityService } from '../../services/availability.service';
import { Availability } from '../../models/availability.model';

@Component({
  selector: 'app-setup-schedule',
  templateUrl: './setup-schedule.component.html'
})
export class SetupScheduleComponent {
  availability: Availability = {
    id: 0,
    doctorId: 1, // Assuming logged-in doctor
    availableDate: '',
    startTime: '',
    endTime: ''
  };

  constructor(private availabilityService: AvailabilityService) {}

  setAvailability() {
    this.availabilityService.addAvailability(this.availability).subscribe(() => {
      alert('Availability set successfully');
    });
  }
}
