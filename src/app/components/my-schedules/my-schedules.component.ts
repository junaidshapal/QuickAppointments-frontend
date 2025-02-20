import { Component, OnInit } from '@angular/core';
import { AvailabilityService } from '../../services/availability.service';
import { Availability } from '../../models/availability.model';

@Component({
  selector: 'app-my-schedules',
  templateUrl: './my-schedules.component.html'
})
export class MySchedulesComponent implements OnInit {
  availabilities: Availability[] = [];

  constructor(private availabilityService: AvailabilityService) {}

  ngOnInit() {
    const doctorId = 1; // Assume logged-in doctor
    this.availabilityService.getAvailabilityByDoctor(doctorId).subscribe(data => {
      this.availabilities = data;
    });
  }
}
