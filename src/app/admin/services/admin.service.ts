import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { User } from '../../models/user.model';
import { Availability } from '../../models/availability.model';

@Injectable({
  providedIn: 'root'
})
export class AdminService {
  private apiUrl = 'https://localhost:7249/api/admin'; // Update with your API base URL

  constructor(private http: HttpClient) {}

  //Get all users
  getAllUsers(): Observable<any> {
    return this.http.get(`${this.apiUrl}/users`);
  }
  
  //Get Doctors only
  getAllDoctors(): Observable<User[]> {
    return this.http.get<User[]>(`${this.apiUrl}/getAllDoctors`);
  }
  

  //Approve user
  approveUser(userId: string): Observable<any> {
    return this.http.post(`${this.apiUrl}/approve/${userId}`, {});
  }

  //Block user
  blockUser(userId: string): Observable<any> {
    return this.http.post(`${this.apiUrl}/block/${userId}`, {});
  }

  //Delete user
  deleteUser(userId: string): Observable<any> {
    return this.http.delete(`${this.apiUrl}/delete/${userId}`);
  }

  //Edit user details
  updateUser(userId: string, updatedUser: any): Observable<any> {
    return this.http.put(`${this.apiUrl}/update/${userId}`, updatedUser);
  }

  //Get all appointments
  getAllAppointments(): Observable<any> {
    return this.http.get(`${this.apiUrl}/appointments`);
  }

  //Cancel an appointment
  cancelAppointment(appointmentId: number): Observable<any> {
    return this.http.post(`${this.apiUrl}/cancel-appointment/${appointmentId}`, {});
  }

// Fetch availability of a doctor
getDoctorAvailability(doctorId: string): Observable<Availability[]> {
  return this.http.get<Availability[]>(`${this.apiUrl}/doctor/${doctorId}/availability`);
}

// Delete availability slot
deleteDoctorAvailability(availabilityId: number): Observable<any> {
  return this.http.delete(`${this.apiUrl}/availability/${availabilityId}`);
}


  //Cancel all appointments for a doctor on a specific date
  // cancelAppointmentsForDate(doctorId: string, date: string): Observable<any> {
  //   return this.http.post(`${this.apiUrl}/cancel-appointments-date`, { doctorId, date });
  // }
}
