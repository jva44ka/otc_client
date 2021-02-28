import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Department } from '../../../models/department';

@Component({
  selector: 'app-departments-list-item',
  templateUrl: './departments-list-items.component.html',
  styleUrls: ['./departments-list-items.component.scss']
})
export class DepartmentsListItemsComponent implements OnInit {
  @Input() department: Department;

  @Output() checkInfoDepartment: EventEmitter<Department> = new EventEmitter<Department>();

  constructor() { }

  ngOnInit(): void {
  }

}
