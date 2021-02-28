import { Injectable } from '@angular/core';
import { BaseHttpService } from './base-http.service';
import { HttpClient } from '@angular/common/http';
import { ConfigurationService } from '../configuration.service';
import { Employee } from '../../models/employee';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class EmployeeHttpService extends BaseHttpService {
  private controllerName = 'employee';

  constructor(httpClient: HttpClient,
              configuration: ConfigurationService) {
    super(httpClient, configuration);
  }

  public createEmployee(newEmployee: Employee): Observable<Employee> {
    return this.postResource<Employee>(`${this.controllerName}`, newEmployee);
  }

  public updateEmployee(id: string, newEmployee: Employee): Observable<Employee> {
    return this.putResource<Employee>(`${this.controllerName}/${id}`, newEmployee);
  }

  public deleteEmployee(id: string): Observable<Employee> {
    return this.deleteResource<Employee>(`${this.controllerName}/${id}`);
  }
}
