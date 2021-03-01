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
    console.log(this.mainStore);
    console.log(this);
    console.log(this.isUpdating);
    if (this.isUpdating) {
      this.employee = this.mainStore.changingEmployee$.getValue();
      this.subs.push(
        this.mainStore.changingEmployee$.subscribe(e => {
          this.employee = e;
          console.log('change employee: ');
          console.log(e);
          console.log('changed employee: ');
          console.log(this.employee);
        })
      );
    } else {
      this.employee = this.mainStore.newEmployee$.getValue();
      this.subs.push(
        this.mainStore.newEmployee$.subscribe(e => {
          this.employee = e;
          console.log('new employee: ');
          console.log(e);
          console.log('changed employee: ');
          console.log(this.employee);
        })
      );
    }

    console.log(this);
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
    console.log(this.selectedDepartment);
  }

  nameChange(event: Event): void {
    console.log(event.target);
    this.employee.name = (event.target as any).value;
  }

  salaryChange(event: Event): void {
    this.employee.salary = (event.target as any).value;
  }

  submit(): void {
    console.log(this.isUpdating);
    if (this.isUpdating) {
      this.employee.departmentId = this.selectedDepartment.id;
      this.mainStore.updateEmployee();
    } else {
      console.log(this.employee);
      console.log(this.mainStore.newEmployee$);
      this.employee.departmentId = this.selectedDepartment.id;
      this.mainStore.createEmployee();
    }
    this.router.navigate(['']);
  }
}
