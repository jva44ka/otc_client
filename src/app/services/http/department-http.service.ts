import { Injectable } from '@angular/core';
import { BaseHttpService } from './base-http.service';
import { HttpClient } from '@angular/common/http';
import { ConfigurationService } from '../configuration.service';
import { Observable } from 'rxjs';
import { Department } from '../../models/department';

@Injectable({
  providedIn: 'root'
})
export class DepartmentHttpService extends BaseHttpService {
  private controllerName = 'department';

  constructor(httpClient: HttpClient,
              configuration: ConfigurationService) {
    super(httpClient, configuration);
  }

  public getDepartments(): Observable<Department[]> {
    return this.getResource<Department[]>(`${this.controllerName}`);
  }
}
