import { Component } from '@angular/core';
import { DepartmentService } from '../../../services/department.service';
import { Department } from '../../../models/department.model';

@Component({
  selector: 'app-add-department',
  templateUrl: './add-department.component.html'
})

export class AddDepartmentComponent {
  department: Department = { id: 0, name: '', description: '' };

  constructor(private departmentService: DepartmentService) {}

  addDepartment() {
    this.departmentService.addDepartment(this.department).subscribe(() => {
      alert('Department added successfully');
    });
  }
}
