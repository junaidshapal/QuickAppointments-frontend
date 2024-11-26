import { Component } from '@angular/core';
import { faEdit, faTrash } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-users-management',
  templateUrl: './users-management.component.html',
  styleUrls: ['./users-management.component.css'],
})
export class UsersManagementComponent {
  // Mock data for users
  users = [
    { id: 1, name: 'John Doe', email: 'john.doe@example.com', role: 'Admin', status: 'Active' },
    { id: 2, name: 'Jane Smith', email: 'jane.smith@example.com', role: 'Doctor', status: 'Active' },
    { id: 3, name: 'Michael Lee', email: 'michael.lee@example.com', role: 'Patient', status: 'Inactive' },
    { id: 4, name: 'Anna White', email: 'anna.white@example.com', role: 'Doctor', status: 'Active' },
  ];

  // FontAwesome icons
  faEdit = faEdit;
  faTrash = faTrash;

  // Pagination properties
  pageSize = 3;
  currentPage = 1;
  totalPages = Math.ceil(this.users.length / this.pageSize);

  // Getter for total pages as an array
  get totalPagesArray() {
    return Array.from({ length: this.totalPages }, (_, i) => i + 1);
  }

  // Get paginated users
  get paginatedUsers() {
    const startIndex = (this.currentPage - 1) * this.pageSize;
    return this.users.slice(startIndex, startIndex + this.pageSize);
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

  // Edit user
  editUser(user: any) {
    console.log('Editing user:', user);
    // Add logic to edit user, e.g., open a form pre-filled with user details
  }

  // Delete user
  deleteUser(userToDelete: any) {
    const confirmed = confirm('Are you sure you want to delete this user?');
    if (confirmed) {
      this.users = this.users.filter((user) => user.id !== userToDelete.id);
      this.totalPages = Math.ceil(this.users.length / this.pageSize);
      if (this.currentPage > this.totalPages) {
        this.currentPage = this.totalPages;
      }
    }
  }
}
