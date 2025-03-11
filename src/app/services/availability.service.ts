import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Availability } from '../models/availability.model';

@Injectable({
  providedIn: 'root'
})
export class AvailabilityService {
  private apiUrl = 'https://localhost:7249/api/Availability';

  constructor(private http: HttpClient) {}

  getAvailabilityByDoctor(doctorId: string): Observable<Availability[]> {
    return this.http.get<Availability[]>(`${this.apiUrl}/doctor/${doctorId}`);
  }

  addAvailability(availability: Availability): Observable<any> {
    return this.http.post(this.apiUrl, availability);
  }
}
