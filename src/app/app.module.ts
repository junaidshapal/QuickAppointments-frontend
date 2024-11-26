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
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { NavbarComponent } from './components/navbar/navbar.component';
import { AppointmentsComponent } from './components/appointments/appointments.component';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { TopbarComponent } from './components/topbar/topbar.component';
import { UsersManagementComponent } from './userManagement/users-management/users-management.component';
import { RolesManagementComponent } from './userManagement/roles-management/roles-management.component';


export function tokenGetter(){
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
    RolesManagementComponent
  ],
  imports: [
    BrowserModule,
    FontAwesomeModule,
    FormsModule,
    AppRoutingModule,
    ReactiveFormsModule,
    HttpClientModule,
    JwtModule.forRoot({
      config:{
        tokenGetter:tokenGetter,
        allowedDomains: ['localhost:5000'],
        disallowedRoutes:['localhost:5000/api/auth/login', 'localhost:5000/api/auth/register']
      }
    })
  ],
  // providers: [
  //   provideClientHydration()
  // ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthInterceptor,
      multi: true
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
