import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdminComponent } from './admin.component';
import { AdminDashboardComponent } from './admin-dashboard/admin-dashboard.component';
import { AuthGuard } from '../Auth/auth.guard';
import { ManageUsersComponent } from './manage-users/manage-users.component';
import { EditUserComponent } from './edit-user/edit-user.component';
import { ManageAppointmentsComponent } from './manage-appointments/manage-appointments.component';
import { DoctorAvailabilityComponent } from './doctor-availability/doctor-availability.component';
import { ManageDoctorsComponent } from './manage-doctors/manage-doctors.component';

// const routes: Routes = [
//   { path: '', component: AdminDashboardComponent },
//   { path: 'users', component: ManageUsersComponent },
//   { path: 'users/edit/:id', component: EditUserComponent},
//   { path: 'manage-appointments', component: ManageAppointmentsComponent},
//   { path: 'availability', component: DoctorAvailabilityComponent }
// ];

const routes: Routes = [
  {
    path: '',
    component: AdminComponent,
    canActivate: [AuthGuard], 
    children: [
      { path: 'dashboard', component: AdminDashboardComponent },
      { path: 'manage-users', component: ManageUsersComponent },
      { path: 'manage-appointments', component: ManageAppointmentsComponent, canActivate: [AuthGuard] },
      { path: 'manage-doctors', component: ManageDoctorsComponent, canActivate: [AuthGuard] },
      { path: 'doctor-availability/:doctorId', component: DoctorAvailabilityComponent, canActivate: [AuthGuard] },
    ],
  }
];
@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminRoutingModule { }
