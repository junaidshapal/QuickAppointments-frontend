import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { AdminService } from '../services/admin.service';

@Component({
  selector: 'app-edit-user',
  templateUrl: './edit-user.component.html',
  styleUrls: ['./edit-user.component.css']
})
export class EditUserComponent {
  updatedUser: any = {};

  constructor(
    // dialogRef for managing the modal dialog
    public dialogRef: MatDialogRef<EditUserComponent>,
    @Inject(MAT_DIALOG_DATA) public user: any,
    private adminService: AdminService
  ) {
    this.updatedUser = { ...user }; //Copy existing user data
  }

  // method to save changes made to the user
  saveChanges() {
    this.adminService.updateUser(this.updatedUser.id, this.updatedUser).subscribe(() => {
      alert('User Updated Successfully');
      this.dialogRef.close(true); //Close modal and reload users
    });
  }

  close() {
    this.dialogRef.close();
  }
}
