import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AdminRoutingModule } from './admin-routing.module';
import { AdminComponent } from './admin.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatTableModule } from '@angular/material/table';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatDialogModule } from '@angular/material/dialog';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { AdminDashboardComponent } from './admin-dashboard/admin-dashboard.component';
import { ManageUsersComponent } from './manage-users/manage-users.component';
import { EditUserComponent } from './edit-user/edit-user.component';
import { ManageAppointmentsComponent } from './manage-appointments/manage-appointments.component';
import { DoctorAvailabilityComponent } from './doctor-availability/doctor-availability.component';
import { ManageDoctorsComponent } from './manage-doctors/manage-doctors.component';



@NgModule({
  declarations: [
    AdminComponent,
    AdminDashboardComponent,
    ManageUsersComponent,
    EditUserComponent,
    ManageAppointmentsComponent,
    DoctorAvailabilityComponent,
    ManageDoctorsComponent,
    
  ],
  imports: [
    CommonModule,
    AdminRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    MatTableModule,
    MatIconModule,
    MatButtonModule,
    MatDialogModule,
    MatSnackBarModule
  ]
})
export class AdminModule { }
