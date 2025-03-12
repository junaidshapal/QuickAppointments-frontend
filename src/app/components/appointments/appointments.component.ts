import { Component, OnInit, ViewChild } from '@angular/core';
import { AppointmentService } from '../../services/appointment.service';
import { Appointment } from '../../models/appointment.model';
import { Router } from '@angular/router';
import { AddAppointmentComponent } from '../appointment/add-appointment/add-appointment.component';
import { MatDialog } from '@angular/material/dialog';
import { AppointmentDetailComponent } from '../appointment/appointment-detail/appointment-detail.component';

@Component({
  selector: 'app-appointments',
  templateUrl: './appointments.component.html'
})
export class AppointmentsComponent implements OnInit {
  appointments: Appointment[] = [];
  pageSize = 3;
  currentPage = 1;
  totalItems = 0;

  @ViewChild(AddAppointmentComponent) addAppointmentComponent!: AddAppointmentComponent;

  constructor(
    private appointmentService: AppointmentService,
    private router: Router,
    private dialog: MatDialog
  ) {}

  ngOnInit() {
    this.loadAppointments();
  }

  loadAppointments() {
    this.appointmentService.getAppointments().subscribe(data => {
      this.appointments = data || [];
      this.totalItems = this.appointments.length;
    });
  }

  get paginatedAppointments() {
    const startIndex = (this.currentPage - 1) * this.pageSize;
    return this.appointments.slice(startIndex, startIndex + this.pageSize);
  }
  get totalPages() {
    return Math.ceil(this.totalItems / this.pageSize);
  }
  get totalPagesArray() {
    return Array.from({ length: this.totalPages }, (_, i) => i + 1);
  }
  get paginationSummary() {
    const startItem = (this.currentPage - 1) * this.pageSize + 1;
    const endItem = Math.min(this.currentPage * this.pageSize, this.totalItems);
    return `Showing ${startItem} - ${endItem} out of ${this.totalItems}`;
  }
  nextPage() {
    if (this.currentPage < this.totalPages) {
      this.currentPage++;
    }
  }
  prevPage() {
    if (this.currentPage > 1) {
      this.currentPage--;
    }
  }

  goToPage(page: number) {
    this.currentPage = page;
  }

  openAddAppointment() {
    this.addAppointmentComponent.openDrawer();
  }

  // viewDetails(appointmentId: number) {
  //   this.router.navigate(['/appointment', appointmentId]);
  // }
  viewDetails(appointment: Appointment) {
    const dialogRef = this.dialog.open(AppointmentDetailComponent, {
      width: '500px',
      data: appointment
    });

    // Fix hover issue after closing modal
    dialogRef.afterClosed().subscribe(() => {
      (document.activeElement as HTMLElement)?.blur();
    });
  }

  onAppointmentAdded(newAppointment: Appointment) {
    this.appointments.push(newAppointment);
    this.totalItems = this.appointments.length;
  }
}
