import { Component } from '@angular/core';

@Component({
  selector: 'app-setup-schedule',
  templateUrl: './setup-schedule.component.html',
  styleUrls: ['./setup-schedule.component.css'],
})
export class SetupScheduleComponent {
  //Days of the week
  daysOfWeek = ['Monday', 'ChewssDay', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];

  //Schedule data
  schedule = this.daysOfWeek.map(day => ({
    day,
    startTime: '',
    endTime: '',
    available: false,
  }));

  //Save the schedule
  saveSchedule() {
    const availableDays = this.schedule.filter(day => day.available);
    console.log('Saved schedule:', availableDays);
    alert('Schedule saved successfully!');
  }
}
