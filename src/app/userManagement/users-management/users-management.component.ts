import { Component } from '@angular/core';
import { faEdit, faTrash } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-users-management',
  templateUrl: './users-management.component.html',
  styleUrls: ['./users-management.component.css'],
})
export class UsersManagementComponent {
  users = [
    { id: 1, name: 'Junaid Mughal', email: 'junaid.mughal@example.com', role: 'Admin', status: 'Active' },
    { id: 2, name: 'Jamil Moughal', email: 'jamil.moughal@example.com', role: 'Doctor', status: 'Active' },
    { id: 3, name: 'Touseef Mughal', email: 'michael.lee@example.com', role: 'Patient', status: 'Inactive' },
    { id: 4, name: 'Anna White', email: 'anna.white@example.com', role: 'Doctor', status: 'Active' },
    { id: 5, name: 'Chris Martin', email: 'chris.martin@example.com', role: 'Patient', status: 'Active' },
    { id: 6, name: 'Abdal Shahpal', email: 'abdal.aws@example.com', role: 'AWS Architect', status: 'Inactive' },
  ];

  faEdit = faEdit;
  faTrash = faTrash;

  //Pagination properties
  pageSize = 3;
  currentPage = 1;
  totalItems = this.users.length;

  //Getter for total pages
  get totalPages() {
    return Math.ceil(this.totalItems / this.pageSize);
  }

  //Getter for total pages as an array (used for page navigation)
  get totalPagesArray() {
    return Array.from({ length: this.totalPages }, (_, i) => i + 1);
  }

  //Get paginated users (users displayed on the current page)
  get paginatedUsers() {
    const startIndex = (this.currentPage - 1) * this.pageSize;
    return this.users.slice(startIndex, startIndex + this.pageSize);
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

  //Display pagination summary
  get paginationSummary() {
    const startItem = (this.currentPage - 1) * this.pageSize + 1;
    const endItem = Math.min(this.currentPage * this.pageSize, this.totalItems);
    return `Showing ${startItem} - ${endItem} out of ${this.totalItems}`;
  }

  //Method for Edit user
  editUser(user: any) {
    console.log('Editing user:', user);
    // Add logic to edit user, e.g., open a form pre-filled with user details
  }

  //Method for Delete user
  deleteUser(userToDelete: any) {
    const confirmed = confirm('Are you sure you want to delete this user?');
    if (confirmed) {
      this.users = this.users.filter((user) => user.id !== userToDelete.id);
      this.totalItems = this.users.length; // Update total items after deletion
      if (this.currentPage > this.totalPages) {
        this.currentPage = this.totalPages; // Adjust current page if it exceeds total pages
      }
    }
  }
}
