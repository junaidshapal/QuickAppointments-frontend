import { NgModule } from '@angular/core';
import { BrowserModule, provideClientHydration } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { JwtModule } from '@auth0/angular-jwt';
import { SignupComponent } from './AuthComponents/signup/signup.component';
import { LoginComponent } from './AuthComponents/login/login.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { AuthInterceptor } from './Auth/token.interceptor';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { NavbarComponent } from './components/navbar/navbar.component';
import { AppointmentsComponent } from './components/appointments/appointments.component';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { TopbarComponent } from './components/topbar/topbar.component';
import { UsersManagementComponent } from './userManagement/users-management/users-management.component';
import { RolesManagementComponent } from './userManagement/roles-management/roles-management.component';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { SetupScheduleComponent } from './components/setup-schedule/setup-schedule.component';
import { HttpClientModule } from '@angular/common/http';

// Angular Material Modules
import { MatCardModule } from '@angular/material/card';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MySchedulesComponent } from './components/my-schedules/my-schedules.component';
import { AppointmentDetailComponent } from './components/appointment/appointment-detail/appointment-detail.component';
import { AddAppointmentComponent } from './components/appointment/add-appointment/add-appointment.component';
import { DoctorListComponent } from './components/Doctor/doctor-list/doctor-list.component';
import { AddDoctorComponent } from './components/Doctor/add-doctor/add-doctor.component';
import { MatTableModule } from '@angular/material/table';
import { MatSelectModule } from '@angular/material/select';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatDialogModule } from '@angular/material/dialog';
import { DepartmentListComponent } from './components/department/department-list/department-list.component';
import { AddDepartmentComponent } from './components/department/add-department/add-department.component';
import { AdminService } from './admin/services/admin.service';


export function tokenGetter() {
  return localStorage.getItem('jwtToken');
}

@NgModule({
  declarations: [
    AppComponent,
    SignupComponent,
    LoginComponent,
    DashboardComponent,
    NavbarComponent,
    AppointmentsComponent,
    TopbarComponent,
    UsersManagementComponent,
    RolesManagementComponent,
    SetupScheduleComponent,
    MySchedulesComponent,
    AppointmentDetailComponent,
    AddAppointmentComponent,
    DoctorListComponent,
    AddDoctorComponent,
    DepartmentListComponent,
    AddDepartmentComponent,
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule, // Required for Angular Material animations
    FontAwesomeModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    AppRoutingModule,
    JwtModule.forRoot({
      config: {
        tokenGetter: tokenGetter,
        allowedDomains: ['localhost:5000'],
        disallowedRoutes: ['localhost:5000/api/auth/login', 'localhost:5000/api/auth/register'],
      },
    }),
    // Angular Material Modules
    MatCardModule,
    MatCheckboxModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatIconModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatTableModule,
    MatSelectModule,
    MatPaginatorModule,
    MatDialogModule
  ],
  providers: [
    //AdminService,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthInterceptor,
      multi: true,
    },
    provideAnimationsAsync(),
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
