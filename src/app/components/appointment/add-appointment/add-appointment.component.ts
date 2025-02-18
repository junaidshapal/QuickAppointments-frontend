import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { DoctorService } from '../../../services/doctor.service';
import { AppointmentService } from '../../../services/appointment.service';
import { Doctor } from '../../../models/doctor.model';
import { Appointment } from '../../../models/appointment.model';

@Component({
  selector: 'app-add-appointment',
  templateUrl: './add-appointment.component.html'
})
export class AddAppointmentComponent implements OnInit {
  @Output() appointmentAdded = new EventEmitter<Appointment>();

  doctors: Doctor[] = [];
  drawerOpen = false;
  appointment: Appointment = {
    id: 0,
    doctorId: 0,
    customerId: 1,
    appointmentDate: '',
    startTime: '',
    endTime: '',
    status: 'Pending'
  };

  constructor(private doctorService: DoctorService, private appointmentService: AppointmentService) {}

  ngOnInit() {
    this.doctorService.getDoctors().subscribe(data => {
      this.doctors = data;
    });
  }

  openDrawer() {
    this.drawerOpen = true;
  }

  closeDrawer() {
    this.drawerOpen = false;
  }

  bookAppointment() {
    this.appointmentService.bookAppointment(this.appointment).subscribe(() => {
      alert('Appointment booked successfully');
      this.appointmentAdded.emit(this.appointment);
      this.closeDrawer();
    });
  }
}
