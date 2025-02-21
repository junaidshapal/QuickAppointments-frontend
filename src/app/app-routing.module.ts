import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import path from 'node:path';
import { LoginComponent } from './AuthComponents/login/login.component';
import { SignupComponent } from './AuthComponents/signup/signup.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { AppointmentsComponent } from './components/appointments/appointments.component';
import { RoleGuard } from './Auth/role.guard';
import { UsersManagementComponent } from './userManagement/users-management/users-management.component';
import { RolesManagementComponent } from './userManagement/roles-management/roles-management.component';
import { SetupScheduleComponent } from './components/setup-schedule/setup-schedule.component';
import { MySchedulesComponent } from './components/my-schedules/my-schedules.component';
import { AuthGuard } from './Auth/auth.guard';
import { DoctorListComponent } from './components/Doctor/doctor-list/doctor-list.component';
import { AddDoctorComponent } from './components/Doctor/add-doctor/add-doctor.component';
import { AddAppointmentComponent } from './components/appointment/add-appointment/add-appointment.component';
import { AppointmentDetailComponent } from './components/appointment/appointment-detail/appointment-detail.component';
import { AddDepartmentComponent } from './components/department/add-department/add-department.component';
import { DepartmentListComponent } from './components/department/department-list/department-list.component';

const routes: Routes = [
  {path:'', redirectTo:'login', pathMatch:'full'},
  { path: 'login', component: LoginComponent },
  { path: 'signup', component: SignupComponent },
  { path: 'appointments', component: AppointmentsComponent, canActivate: [AuthGuard] },
  { path: 'dashboard', component: DashboardComponent, canActivate: [AuthGuard] },
  { path: 'users-management', component: UsersManagementComponent, canActivate: [AuthGuard] },
  { path: 'roles-management', component: RolesManagementComponent, canActivate: [AuthGuard]},
  { path: 'setup-schedule', component: SetupScheduleComponent, canActivate: [AuthGuard]  },
  { path: 'my-schedules', component: MySchedulesComponent, canActivate: [AuthGuard]  },
  { path: 'doctors-list', component: DoctorListComponent  },
  { path: 'add-doctor', component: AddDoctorComponent  },
  { path: 'add-appointment', component: AddAppointmentComponent },
  { path: 'appointment/:id', component: AppointmentDetailComponent },
  { path: 'add-department', component: AddDepartmentComponent },
  { path: 'departments', component: DepartmentListComponent },
  { path: '**', redirectTo: 'login' },

];


@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
