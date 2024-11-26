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

const routes: Routes = [
  {path:'', redirectTo:'login', pathMatch:'full'},
  { path: 'login', component: LoginComponent },
  { path: 'signup', component: SignupComponent },
  { path: 'appointments', component: AppointmentsComponent },
  { path: 'dashboard', component: DashboardComponent, canActivate: [AuthGuard] },
  { path: 'users-management', component: UsersManagementComponent, canActivate: [AuthGuard] },
  { path: 'roles-management', component: RolesManagementComponent, canActivate: [AuthGuard] }

];


@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
