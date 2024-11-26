import { Component } from '@angular/core';
import { faEdit, faTrash } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-appointments',
  templateUrl: './appointments.component.html',
  styleUrls: ['./appointments.component.css']
})
export class AppointmentsComponent {
  appointments = [
    { clientName: 'John Doe', date: '2024-10-16', time: '10:00 AM', purpose: 'Consultation' },
    { clientName: 'Jane Smith', date: '2024-10-17', time: '11:30 AM', purpose: 'Follow-up' },
    { clientName: 'Michael Lee', date: '2024-10-18', time: '02:00 PM', purpose: 'New Project' },
    { clientName: 'Anna White', date: '2024-10-19', time: '09:00 AM', purpose: 'Interview' },
    { clientName: 'Chris Martin', date: '2024-10-20', time: '01:00 PM', purpose: 'Consultation' },
  ];

  // FontAwesome icons
  faEdit = faEdit;
  faTrash = faTrash;

  // Drawer state
  drawerOpen = false;

  // New appointment object
  newAppointment = { clientName: '', date: '', time: '', purpose: '' };

  // Pagination properties
  pageSize = 3;
  currentPage = 1;
  totalPages = Math.ceil(this.appointments.length / this.pageSize);

  get totalPagesArray() {
    return Array.from({ length: this.totalPages }, (_, i) => i + 1);
  }

  get paginatedAppointments() {
    const startIndex = (this.currentPage - 1) * this.pageSize;
    return this.appointments.slice(startIndex, startIndex + this.pageSize);
  }

  // Pagination methods
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

  // Open the new appointment drawer
  openNewAppointment() {
    this.drawerOpen = true;
  }

  // Close the new appointment drawer
  closeNewAppointment() {
    this.drawerOpen = false;
    this.resetNewAppointment();
  }

  // Save the new appointment
  saveAppointment() {
    if (
      this.newAppointment.clientName &&
      this.newAppointment.date &&
      this.newAppointment.time &&
      this.newAppointment.purpose
    ) {
      this.appointments.push({ ...this.newAppointment });
      this.totalPages = Math.ceil(this.appointments.length / this.pageSize);
      this.resetNewAppointment();
      this.drawerOpen = false;
    } else {
      alert('Please fill out all fields.');
    }
  }

  // Reset the new appointment form
  resetNewAppointment() {
    this.newAppointment = { clientName: '', date: '', time: '', purpose: '' };
  }

  // Delete appointment method
  deleteAppointment(appointmentToDelete: any) {
    const confirmed = confirm('Are you sure you want to delete this appointment?');
    if (confirmed) {
      this.appointments = this.appointments.filter(
        appointment => appointment !== appointmentToDelete
      );
      this.totalPages = Math.ceil(this.appointments.length / this.pageSize);
      if (this.currentPage > this.totalPages) {
        this.currentPage = this.totalPages;
      }
    }
  }

  // Edit appointment method
  editAppointment(appointmentToEdit: any) {
    console.log('Editing appointment:', appointmentToEdit);
  }
}
