import { Component } from '@angular/core';

@Component({
  selector: 'app-my-schedules',
  templateUrl: './my-schedules.component.html',
  styleUrls: ['./my-schedules.component.css'],
})
export class MySchedulesComponent {
  // Mock data for schedules
  schedules = [
    {
      day: 'Monday',
      date: '2024-12-18',
      startTime: '09:00 AM',
      endTime: '05:00 PM',
      active: true,
    },
    {
      day: 'Tuesday',
      date: '2024-12-19',
      startTime: '10:00 AM',
      endTime: '04:00 PM',
      active: true,
    },
    {
      day: 'Wednesday',
      date: '2024-12-20',
      startTime: '11:00 AM',
      endTime: '03:00 PM',
      active: false,
    },
    {
      day: 'Thursday',
      date: '2024-12-21',
      startTime: '08:00 AM',
      endTime: '02:00 PM',
      active: true,
    },
    {
      day: 'Friday',
      date: '2024-12-22',
      startTime: '09:30 AM',
      endTime: '01:30 PM',
      active: false,
    },
  ];

  // Edit schedule action
  editSchedule(schedule: any) {
    console.log('Editing schedule:', schedule);
    // Add logic to edit the schedule
  }

  // Delete schedule action
  deleteSchedule(schedule: any) {
    const confirmed = confirm(
      `Are you sure you want to delete the schedule for ${schedule.day}?`
    );
    if (confirmed) {
      this.schedules = this.schedules.filter((s) => s !== schedule);
    }
  }
}
