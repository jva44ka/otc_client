import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { Employee } from '../../../models/employee';
import { MainStoreService } from '../../../services/store/main-store.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Department } from '../../../models/department';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-employee-form',
  templateUrl: './employee-form.component.html',
  styleUrls: ['./employee-form.component.scss']
})
export class EmployeeFormComponent implements OnInit, OnDestroy {
  employee: Employee;
  departments: Department[];
  subs: Subscription[] = [];
  selectedDepartment: Department;

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
              private router: Router) { }

  ngOnInit(): void {
    if (this.isUpdating) {
      this.employee = this.mainStore.changingEmployee$.getValue();
      this.subs.push(
        this.mainStore.changingEmployee$.subscribe(e => {
          this.employee = e;
        })
      );
    } else {
      this.employee = this.mainStore.newEmployee$.getValue();
      this.subs.push(
        this.mainStore.newEmployee$.subscribe(e => {
          this.employee = e;
        })
      );
    }

    this.departments = this.mainStore.departmentStore$.getValue();
    this.selectedDepartment = this.departments.find(d => d.id === this.employee.departmentId);
  }

  ngOnDestroy(): void {
    for (const sub of this.subs) {
      sub.unsubscribe();
    }
  }

  navigateToMain(): void {
    this.router.navigate(['']);
  }

  departmentChange(departmentName: string): void {
    this.selectedDepartment = this.mainStore.getDepartmentByName(departmentName);
  }

  nameChange(event: Event): void {
    this.employee.name = (event.target as any).value;
  }

  salaryChange(event: Event): void {
    this.employee.salary = (event.target as any).value;
  }

  submit(): void {
    if (this.isUpdating) {
      this.employee.departmentId = this.selectedDepartment.id;
      this.mainStore.updateEmployee();
    } else {
      this.employee.departmentId = this.selectedDepartment.id;
      this.mainStore.createEmployee();
    }
    this.router.navigate(['']);
  }
}
