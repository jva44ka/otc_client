import { Injectable } from '@angular/core';
import { DepartmentHttpService } from '../http/department-http.service';
import { EmployeeHttpService } from '../http/employee-http.service';
import { BehaviorSubject } from 'rxjs';
import { Department } from '../../models/department';
import { Employee } from '../../models/employee';

@Injectable({
  providedIn: 'root'
})
export class MainStoreService {
  private _departmentStore: Department[];

  public departmentStore$: BehaviorSubject<Department[]> = new BehaviorSubject<Department[]>(null);

  constructor(private  departmentHttpService: DepartmentHttpService,
              private  employeeHttpService: EmployeeHttpService) {
    this.departmentHttpService.getDepartments().subscribe(res => {
      this._departmentStore = res;
      this.departmentStore$.next(this._departmentStore);
    });
  }

  getDepartmentById(id: string): Department {
    return this._departmentStore.find(d => d.id === id);
  }

  getEmployeeById(id: string): Employee {
    let employee: Employee;
    for (const dep of this._departmentStore) {
      employee = dep.employees.find(d => d.id === id);

      if (employee != undefined)
        return employee;
    }
    return null;
  }

  getDepartmentByEmployeeId(id: string): Department {
    let employee: Employee;
    for (const dep of this._departmentStore) {
      employee = dep.employees.find(d => d.id === id);

      if (employee != undefined)
        return dep;
    }
    return null;
  }

  createEmployee(newEmployee: Employee): void {
    this.employeeHttpService.createEmployee(newEmployee).subscribe(res => {
      const department = this._departmentStore.find(dep => dep.id === newEmployee.departmentId);
      department.employees.push(newEmployee);
      this.departmentStore$.next(this._departmentStore);
    });
  }

  updateEmployee(newEmployee: Employee): void {
    this.employeeHttpService.updateEmployee(newEmployee.id, newEmployee).subscribe(res => {
      const department = this._departmentStore.find(dep => dep.id === newEmployee.departmentId);
      department.employees = department.employees.filter(e => e.id !== newEmployee.id);
      department.employees.push(newEmployee);
      this.departmentStore$.next(this._departmentStore);
    });
  }

  deleteEmployee(id: string): void {
    this.employeeHttpService.deleteEmployee(id).subscribe(res => {

      let employee: Employee;
      for (const dep of this._departmentStore) {
        employee = dep.employees.find(e => e.id === id);
        if (employee != undefined) {
          dep.employees = dep.employees.filter(e => e.id !== id);
          this.departmentStore$.next(this._departmentStore);
          return;
        }
      }
    });
  }
}
