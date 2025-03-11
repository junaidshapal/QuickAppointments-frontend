import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { DoctorService } from '../../../services/doctor.service';
import { AppointmentService } from '../../../services/appointment.service';
import { AvailabilityService } from '../../../services/availability.service';
import { User } from '../../../models/user.model';
import { Appointment } from '../../../models/appointment.model';
import { Availability } from '../../../models/availability.model';

@Component({
  selector: 'app-add-appointment',
  templateUrl: './add-appointment.component.html'
})
export class AddAppointmentComponent implements OnInit {
  @Output() appointmentAdded = new EventEmitter<Appointment>();

  doctors: User[] = []; 
  availableDates: string[] = [];
  availableStartTimes: string[] = [];
  availableEndTimes: string[] = [];
  doctorAvailability: Availability[] = [];
  bookedSlots: string[] = [];
  drawerOpen = false;

  appointment: Appointment = {
    id: 0,
    doctorId: '',
    customerId: 1, 
    appointmentDate: '',
    startTime: '',
    endTime: '',
    status: 'Pending'
  };

  constructor(
    private doctorService: DoctorService,
    private appointmentService: AppointmentService,
    private availabilityService: AvailabilityService
  ) {}

  ngOnInit() {
    this.fetchDoctors();
  }

  fetchDoctors() {
    this.doctorService.getDoctors().subscribe({
      next: (data) => {
        console.log('Doctors fetched:', data);
        this.doctors = data;
      },
      error: (err) => console.error('Error fetching doctors:', err),
    });
  }

  openDrawer() {
    this.drawerOpen = true;
  }

  closeDrawer() {
    this.drawerOpen = false;
    this.resetForm();
  }

  resetForm() {
    this.appointment.appointmentDate = '';
    this.appointment.startTime = '';
    this.appointment.endTime = '';
    this.availableDates = [];
    this.availableStartTimes = [];
    this.availableEndTimes = [];
  }

  loadAvailability() {
    if (!this.appointment.doctorId) return;
    this.resetForm();
    console.log(`Fetching availability for Doctor ID: ${this.appointment.doctorId}`);
    this.availabilityService.getAvailabilityByDoctor(this.appointment.doctorId).subscribe({
      next: (data) => {
        console.log('Doctor availability:', data);
        this.doctorAvailability = data;
        this.availableDates = [...new Set(data.map(a => a.availableDate))];
      },
      error: (err) => console.error('Error fetching availability:', err),
    });

    this.loadBookedSlots();
  }

  loadBookedSlots() {
    if (!this.appointment.doctorId) return;

    this.appointmentService.getAppointmentsByDoctor(this.appointment.doctorId).subscribe({
      next: (appointments) => {
        console.log('Booked slots:', appointments);
        this.bookedSlots = appointments
          .filter(a => a.appointmentDate === this.appointment.appointmentDate)
          .map(a => a.startTime);
      },
      error: (err) => console.error('Error fetching booked slots:', err),
    });
  }

  loadStartTimes() {
    if (!this.appointment.appointmentDate) return;
    const availabilityForDay = this.doctorAvailability.filter(a => a.availableDate === this.appointment.appointmentDate);
    if (availabilityForDay.length === 0) {
      this.availableStartTimes = [];
      return;
    }
    this.availableStartTimes = availabilityForDay
      .map(a => a.startTime)
      .filter(time => !this.bookedSlots.includes(time));
    this.appointment.startTime = '';
    this.appointment.endTime = '';
    this.availableEndTimes = [];
    console.log('Available start times:', this.availableStartTimes);
  }

  loadEndTimes() {
    if (!this.appointment.startTime) return;
    const availabilityForDay = this.doctorAvailability.filter(a => a.availableDate === this.appointment.appointmentDate);
    const matchingAvailability = availabilityForDay.find(a => a.startTime === this.appointment.startTime);
    this.availableEndTimes = matchingAvailability ? [matchingAvailability.endTime] : [];
    console.log('Available end times:', this.availableEndTimes);
  }

  bookAppointment() {
    if (!this.appointment.doctorId || !this.appointment.appointmentDate || !this.appointment.startTime || !this.appointment.endTime) {
      alert('All fields are required.');
      return;
    }
    console.log('Booking appointment:', this.appointment);
    this.appointmentService.bookAppointment(this.appointment).subscribe({
      next: () => {
        alert('Appointment booked successfully');
        this.appointmentAdded.emit(this.appointment);
        this.resetForm();
        this.closeDrawer();
      },
      error: (err) => console.error('Error booking appointment:', err),
    });
  }
}
