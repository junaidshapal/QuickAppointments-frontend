import { Component } from '@angular/core';

@Component({
  selector: 'app-roles-management',
  templateUrl: './roles-management.component.html',
  styleUrls: ['./roles-management.component.css'],
})
export class RolesManagementComponent {
  // Mock data for roles
  roles = [
    { id: 1, name: 'Admin', description: 'Has full access to the system.', userCount: 5 },
    { id: 2, name: 'Doctor', description: 'Manages appointments and schedules.', userCount: 10 },
    { id: 3, name: 'Patient', description: 'Can book appointments.', userCount: 25 },
    { id: 4, name: 'Manager', description: 'Handles team and operations.', userCount: 3 },
    { id: 5, name: 'Teacher', description: 'Teachs students.', userCount: 6 },
  ];

  // Delete role method
  deleteRole(roleToDelete: any) {
    const confirmed = confirm('Are you sure you want to delete this role?');
    if (confirmed) {
      this.roles = this.roles.filter((role) => role.id !== roleToDelete.id);
    }
  }

  // Edit role method
  editRole(roleToEdit: any) {
    console.log('Editing role:', roleToEdit);
    // Add logic to edit role, e.g., open a modal or form with role details
  }
}
