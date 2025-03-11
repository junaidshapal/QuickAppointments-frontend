import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { User } from '../models/user.model';

@Injectable({
  providedIn: 'root',
})
export class DoctorService {
  private apiUrl = 'https://localhost:7249/api/auth';

  constructor(private http: HttpClient) {}

  getDoctors(): Observable<User[]> {
    return this.http.get<User[]>(`${this.apiUrl}/doctors`); // Fetch users with role "Doctor"
  }

  getDoctorById(id: string): Observable<User> {
    return this.http.get<User>(`${this.apiUrl}/${id}`);
  }
}
