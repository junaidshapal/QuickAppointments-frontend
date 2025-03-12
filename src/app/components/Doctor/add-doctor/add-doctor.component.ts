import { Component, EventEmitter, Output } from '@angular/core';
import { DoctorService } from '../../../services/doctor.service';

@Component({
  selector: 'app-add-doctor',
  templateUrl: './add-doctor.component.html',
})
export class AddDoctorComponent {
  drawerOpen = false;


  constructor(private doctorService: DoctorService) {}

  openDrawer() {
    this.drawerOpen = true;
  }

  closeDrawer() {
    this.drawerOpen = false;
    this.resetForm();
  }

  

  resetForm() {
  }
}
