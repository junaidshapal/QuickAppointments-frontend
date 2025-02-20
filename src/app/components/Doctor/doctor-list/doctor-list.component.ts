import { Component, OnInit, ViewChild } from '@angular/core';
import { DoctorService } from '../../../services/doctor.service';
import { Doctor } from '../../../models/doctor.model';
import { AddDoctorComponent } from '../add-doctor/add-doctor.component';

@Component({
  selector: 'app-doctor-list',
  templateUrl: './doctor-list.component.html',
})
export class DoctorListComponent implements OnInit {
  doctors: Doctor[] = [];

  @ViewChild(AddDoctorComponent) addDoctorComponent!: AddDoctorComponent;

  // Pagination properties
  pageSize = 3; // Number of doctors per page
  currentPage = 1; // Current active page
  totalItems = 0; // Total number of doctors

  constructor(private doctorService: DoctorService) {}

  ngOnInit() {
    this.loadDoctors();
  }

  loadDoctors() {
    this.doctorService.getDoctors().subscribe((data) => {
      this.doctors = data;
      this.totalItems = this.doctors.length; // Set total count
    });
  }

  // Get paginated doctors for the current page
  get paginatedDoctors() {
    const startIndex = (this.currentPage - 1) * this.pageSize;
    return this.doctors.slice(startIndex, startIndex + this.pageSize);
  }

  // Pagination methods
  nextPage() {
    if (this.currentPage < this.totalPages) {
      this.currentPage++;
    }
  }

  prevPage() {
    if (this.currentPage > 1) {
      this.currentPage--;
    }
  }

  goToPage(page: number) {
    this.currentPage = page;
  }

  // Getter for total pages count
  get totalPages() {
    return Math.ceil(this.totalItems / this.pageSize);
  }

  get totalPagesArray() {
    return Array.from({ length: this.totalPages }, (_, i) => i + 1);
  }

  // Display pagination summary
  get paginationSummary() {
    const startItem = (this.currentPage - 1) * this.pageSize + 1;
    const endItem = Math.min(this.currentPage * this.pageSize, this.totalItems);
    return `Showing ${startItem} - ${endItem} out of ${this.totalItems}`;
  }

  // Open the Add Doctor drawer
  openAddDoctor() {
    this.addDoctorComponent.openDrawer();
  }

  // When a doctor is added, update the list dynamically
  onDoctorAdded(newDoctor: Doctor) {
    this.doctors.push(newDoctor);
    this.totalItems = this.doctors.length;
  }
}
