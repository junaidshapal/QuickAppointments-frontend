import { Component, OnInit } from '@angular/core';
import { Appointment } from '../../models/appointment.model';
import { AdminService } from '../services/admin.service';

@Component({
  selector: 'app-manage-appointments',
  templateUrl: './manage-appointments.component.html',
  styleUrls: ['./manage-appointments.component.css']
})
export class ManageAppointmentsComponent implements OnInit {
  appointments: Appointment[] = [];
  filteredAppointments: Appointment[] = [];
  searchDate: string = '';
  selectedDoctorId: string = '';
  doctors: any[] = [];

  constructor(private adminService: AdminService) {}

  ngOnInit() {
    this.loadAppointments();
    this.loadDoctors();
  }

  loadAppointments() {
    this.adminService.getAllAppointments().subscribe(data => {
      this.appointments = data;
      this.filteredAppointments = [...this.appointments]; // Set initial filtered list
    });
  }

  loadDoctors() {
    this.adminService.getAllDoctors().subscribe(data => {
      this.doctors = data;
    });
  }

  filterAppointments() {
    this.filteredAppointments = this.appointments.filter(appointment => {
      const matchDate = this.searchDate ? appointment.appointmentDate.includes(this.searchDate) : true;
      const matchDoctor = this.selectedDoctorId ? appointment.doctorId === this.selectedDoctorId : true;
      return matchDate && matchDoctor;
    });
  }

  cancelAppointment(appointmentId: number) {
    if (confirm('Are you sure you want to cancel this appointment?')) {
      this.adminService.cancelAppointment(appointmentId).subscribe(() => {
        alert('Appointment Cancelled!');
        this.loadAppointments();
      });
    }
  }
}
