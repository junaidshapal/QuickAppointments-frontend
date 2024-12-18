import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import path from 'node:path';
import { LoginComponent } from './AuthComponents/login/login.component';
import { SignupComponent } from './AuthComponents/signup/signup.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { AuthGuard } from './Auth/auth.guard';
import { AppointmentsComponent } from './components/appointments/appointments.component';
import { RoleGuard } from './Auth/role.guard';
import { UsersManagementComponent } from './userManagement/users-management/users-management.component';
import { RolesManagementComponent } from './userManagement/roles-management/roles-management.component';
import { SetupScheduleComponent } from './components/setup-schedule/setup-schedule.component';




@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
