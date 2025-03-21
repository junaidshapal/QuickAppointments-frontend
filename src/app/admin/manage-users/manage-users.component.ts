import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { EditUserComponent } from '../edit-user/edit-user.component';
import { AdminService } from '../services/admin.service';

@Component({
  selector: 'app-manage-users',
  templateUrl: './manage-users.component.html',
  styleUrls: ['./manage-users.component.css']
})
export class ManageUsersComponent implements OnInit {
  users: any[] = [];
  paginatedUsers: any[] = []; // Users shown on current page
  currentPage: number = 1;
  pageSize: number = 5;
  totalPages: number = 1;
  constructor(private adminService: AdminService, private dialog: MatDialog) {}

  ngOnInit() {
    this.loadUsers();
  }

  loadUsers() {
    this.adminService.getAllUsers().subscribe(data => {
      this.users = data;
      this.totalPages = Math.ceil(this.users.length / this.pageSize);
      this.paginatedUsers = this.getPaginatedUsers();
    });
  }

  getPaginatedUsers() {
    const start = (this.currentPage - 1) * this.pageSize;
    return this.users.slice(start, start + this.pageSize);
  }

  prevPage() {
    if (this.currentPage > 1) {
      this.currentPage--;
      this.paginatedUsers = this.getPaginatedUsers();
    }
  }

  nextPage() {
    if (this.currentPage < this.totalPages) {
      this.currentPage++;
      this.paginatedUsers = this.getPaginatedUsers();
    }
  }

  goToPage(page: number) {
    this.currentPage = page;
    this.paginatedUsers = this.getPaginatedUsers();
  }

  get paginationSummary() {
    return `Showing ${this.paginatedUsers.length} out of ${this.users.length} users`;
  }

  get totalPagesArray() {
    return Array.from({ length: this.totalPages }, (_, i) => i + 1);
  }


  openEditUserModal(user: any) {
    const dialogRef = this.dialog.open(EditUserComponent, {
      width: '400px',
      data: user
    });

    dialogRef.afterClosed().subscribe(updated => {
      if (updated) {
        this.loadUsers(); // Reload users after update
      }
    });
  }

  approveUser(userId: string) {
    this.adminService.approveUser(userId).subscribe(() => {
      alert('User Approved!');
      this.loadUsers();
    });
  }

  blockUser(userId: string) {
    this.adminService.blockUser(userId).subscribe(() => {
      alert('User Blocked!');
      this.loadUsers();
    });
  }

  deleteUser(userId: string) {
    if (confirm('Are you sure you want to delete this user?')) {
      this.adminService.deleteUser(userId).subscribe(() => {
        alert('User Deleted!');
        this.loadUsers();
      });
    }
  }
}
