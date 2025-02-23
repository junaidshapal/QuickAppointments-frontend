import { Component, OnInit } from '@angular/core';
import { DepartmentService } from '../../../services/department.service';
import { Department } from '../../../models/department.model';

@Component({
  selector: 'app-department-list',
  templateUrl: './department-list.component.html'
})
export class DepartmentListComponent implements OnInit {
  departments: Department[] = [];

  constructor(private departmentService: DepartmentService) {}

  ngOnInit() {
    this.departmentService.getDepartments().subscribe(data => {
      this.departments = data;
    });
  }
}
