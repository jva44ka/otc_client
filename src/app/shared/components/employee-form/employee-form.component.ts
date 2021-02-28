import { Component, Input } from '@angular/core';
import { Employee } from '../../../models/employee';
import { MainStoreService } from '../../../services/store/main-store.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Department } from '../../../models/department';

@Component({
  selector: 'app-employee-form',
  templateUrl: './employee-form.component.html',
  styleUrls: ['./employee-form.component.scss']
})
export class EmployeeFormComponent {
  employee: Employee = new Employee();
  departments: Department[];

  @Input() employeeId: string;
  @Input() isUpdating: boolean;

  get submitLabel(): string {
    if (this.isUpdating) {
      return 'Сохранить изменения';
    } else {
      return 'Создать';
    }
  }

  constructor(private mainStore: MainStoreService,
              private route: ActivatedRoute,
              private router: Router) {
    if (this.employeeId == undefined)
      return;

    this.employee = this.mainStore.getEmployeeById(this.employeeId);
    this.departments = this.mainStore.departmentStore$.getValue();
  }

  navigateToMain(): void {
    this.router.navigate(['']);
  }

  submit(): void {
    if (this.isUpdating) {
      this.mainStore.updateEmployee(this.employee);
    } else {
      this.mainStore.createEmployee(this.employee);
    }
    this.router.navigate(['']);
  }
}
