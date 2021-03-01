import {Department} from './department';

export class Employee {
  public id: string;
  public name: string;
  public salary: number;
  public departmentId: string;
  public department: Department;
}
