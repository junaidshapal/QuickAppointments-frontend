import { Component, OnInit } from '@angular/core';
import { DoctorService } from '../../../services/doctor.service';
import { User } from '../../../models/user.model';

@Component({
  selector: 'app-doctor-list',
  templateUrl: './doctor-list.component.html',
})
export class DoctorListComponent implements OnInit {
  doctors: User[] = [];
  paginatedDoctors: User[] = [];
  currentPage = 1;
  pageSize = 5;
  totalPages = 1;
  totalPagesArray: number[] = [];

  constructor(private doctorService: DoctorService) {}

  ngOnInit(): void {
    this.fetchDoctors();
  }

  fetchDoctors(): void {
    this.doctorService.getDoctors().subscribe({
      next: (response) => {
        this.doctors = response;
        this.updatePagination();
      },
      error: (err) => console.error('Error fetching doctors:', err),
    });
  }

  updatePagination(): void {
    this.totalPages = Math.ceil(this.doctors.length / this.pageSize);
    this.totalPagesArray = Array.from({ length: this.totalPages }, (_, i) => i + 1);
    this.paginatedDoctors = this.doctors.slice(
      (this.currentPage - 1) * this.pageSize,
      this.currentPage * this.pageSize
    );
  }

  prevPage(): void {
    if (this.currentPage > 1) {
      this.currentPage--;
      this.updatePagination();
    }
  }

  nextPage(): void {
    if (this.currentPage < this.totalPages) {
      this.currentPage++;
      this.updatePagination();
    }
  }

  goToPage(page: number): void {
    this.currentPage = page;
    this.updatePagination();
  }
}
