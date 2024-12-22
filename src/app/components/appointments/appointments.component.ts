import { Component } from '@angular/core';
import { faEdit, faTrash } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-appointments',
  templateUrl: './appointments.component.html',
  styleUrls: ['./appointments.component.css']
})
export class AppointmentsComponent {
 

  //FontAwesome icons
  faEdit = faEdit;
  faTrash = faTrash;

  //Drawer state
  drawerOpen = false;

  //New appointment object
  newAppointment = { clientName: '', date: '', time: '', purpose: '' };

  //Pagination properties
  pageSize = 3; //Number of items per page
  currentPage = 1; //Current page
  totalItems = this.appointments.length; // Total number of appointments

  // Getter for total pages
  get totalPages() {
    return Math.ceil(this.totalItems / this.pageSize);
  }

  // Getter for total pages as an array (used for page navigation)
  get totalPagesArray() {
    return Array.from({ length: this.totalPages }, (_, i) => i + 1);
  }

  //Get paginated appointments (appointments displayed on the current page)
  get paginatedAppointments() {
    const startIndex = (this.currentPage - 1) * this.pageSize;
    return this.appointments.slice(startIndex, startIndex + this.pageSize);
  }

  //Pagination methods
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

  //Method for Display pagination summary
  get paginationSummary() {
    const startItem = (this.currentPage - 1) * this.pageSize + 1;
    const endItem = Math.min(this.currentPage * this.pageSize, this.totalItems);
    return `Showing ${startItem} - ${endItem} out of ${this.totalItems}`;
  }

  //Open the new appointment drawer
  openNewAppointment() {
    this.drawerOpen = true;
  }

  //Close the new appointment drawer
  closeNewAppointment() {
    this.drawerOpen = false;
    this.resetNewAppointment();
  }

  //Save the new appointment
  saveAppointment() {
    if (
      this.newAppointment.clientName &&
      this.newAppointment.date &&
      this.newAppointment.time &&
      this.newAppointment.purpose
    ) {
      this.appointments.push({ ...this.newAppointment });
      this.totalItems = this.appointments.length; // Update total items
      this.resetNewAppointment();
      this.drawerOpen = false;
    } else {
      alert('Please fill out all fields.');
    }
  }

  //Reset the new appointment form
  resetNewAppointment() {
    this.newAppointment = { clientName: '', date: '', time: '', purpose: '' };
  }

  //Delete appointment method
  deleteAppointment(appointmentToDelete: any) {
    const confirmed = confirm('Are you sure you want to delete this appointment?');
    if (confirmed) {
      this.appointments = this.appointments.filter(
        appointment => appointment !== appointmentToDelete
      );
      this.totalItems = this.appointments.length; // Update total items
      if (this.currentPage > this.totalPages) {
        this.currentPage = this.totalPages; // Adjust current page if it exceeds total pages
      }
    }
  }

  //Edit appointment method
  editAppointment(appointmentToEdit: any) {
    console.log('Editing appointment:', appointmentToEdit);
  }
}
