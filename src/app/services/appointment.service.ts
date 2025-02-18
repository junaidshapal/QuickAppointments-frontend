import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Appointment } from '../models/appointment.model';

@Injectable({
  providedIn: 'root'
})
export class AppointmentService {
  private apiUrl = 'https://localhost:7249/api/Appointment';

  constructor(private http: HttpClient) {}

  getAppointments(): Observable<Appointment[]> {
    return this.http.get<Appointment[]>(this.apiUrl);
  }

  getAppointmentsByDoctor(doctorId: number): Observable<Appointment[]> {
    return this.http.get<Appointment[]>(`${this.apiUrl}/doctor/${doctorId}`);
  }

  getAppointmentsByCustomer(customerId: number): Observable<Appointment[]> {
    return this.http.get<Appointment[]>(`${this.apiUrl}/customer/${customerId}`);
  }

  bookAppointment(appointment: Appointment): Observable<any> {
    return this.http.post(this.apiUrl, appointment, { responseType: 'text' }); // Fix: Handle text response
  }
}
