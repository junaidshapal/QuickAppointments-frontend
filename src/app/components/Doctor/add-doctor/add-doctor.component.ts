import { Component, EventEmitter, Output } from '@angular/core';
import { DoctorService } from '../../../services/doctor.service';
import { Doctor } from '../../../models/doctor.model';

@Component({
  selector: 'app-add-doctor',
  templateUrl: './add-doctor.component.html',
})
export class AddDoctorComponent {
  doctor: Doctor = { id: 0, name: '', specialty: '', email: '', phoneNumber: '' };
  drawerOpen = false;

  @Output() doctorAdded = new EventEmitter<Doctor>(); // Emit event when doctor is added

  constructor(private doctorService: DoctorService) {}

  openDrawer() {
    this.drawerOpen = true;
  }

  closeDrawer() {
    this.drawerOpen = false;
    this.resetForm();
  }

  addDoctor() {
    if (this.doctor.name && this.doctor.specialty && this.doctor.email && this.doctor.phoneNumber) {
      this.doctorService.addDoctor(this.doctor).subscribe((newDoctor) => {
        alert('Doctor added successfully');
        this.doctorAdded.emit(newDoctor); // Emit new doctor
        this.closeDrawer();
      });
    } else {
      alert('Please fill out all fields.');
    }
  }

  resetForm() {
    this.doctor = { id: 0, name: '', specialty: '', email: '', phoneNumber: '' };
  }
}
