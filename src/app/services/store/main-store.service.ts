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
  public changingEmployee$: BehaviorSubject<Employee> = new BehaviorSubject<Employee>(null);
  public newEmployee$: BehaviorSubject<Employee> = new BehaviorSubject<Employee>(new Employee());

  constructor(private  departmentHttpService: DepartmentHttpService,
              private  employeeHttpService: EmployeeHttpService) {
    this.departmentHttpService.getDepartments().subscribe(res => {
      this._departmentStore = res;
      this.departmentStore$.next(this._departmentStore);
    });
  }

  createEmployee(): void {
    this.createEmployeeReq(this.newEmployee$.getValue());
    this.newEmployee$.next(new Employee());
  }

  updateEmployee(): void {
    this.updateEmployeeReq(this.changingEmployee$.getValue());
    this.changingEmployee$.next(null);
  }

  deleteEmployee(id: string): void {
    this.deleteEmployeeReq(id);
  }

  setChangingEmployee(id: string): void {
    const employee: Employee = this.getEmployeeById(id);
    console.log('changing to ');
    console.log(employee);
    this.changingEmployee$.next(employee);
    console.log(this.changingEmployee$.getValue());
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

  getDepartmentById(id: string): Department {
    return this._departmentStore.find(d => d.id === id);
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

  getDepartmentByName(departmentName: string): Department {
    return this._departmentStore.find(d => d.name === departmentName);
  }

  private createEmployeeReq(newEmployee: Employee): void {
    this.employeeHttpService.createEmployee(newEmployee).subscribe(res => {
      const department = this._departmentStore.find(dep => dep.id === newEmployee.departmentId);
      department.employees.push(newEmployee);
      this.departmentStore$.next(this._departmentStore);
    });
  }

  private updateEmployeeReq(newEmployee: Employee): void {
    this.employeeHttpService.updateEmployee(newEmployee.id, newEmployee).subscribe(res => {
      const department = this._departmentStore.find(dep => dep.id === newEmployee.departmentId);
      department.employees = department.employees.filter(e => e.id !== newEmployee.id);
      department.employees.push(newEmployee);
      this.departmentStore$.next(this._departmentStore);
    });
  }

  private deleteEmployeeReq(id: string): void {
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
