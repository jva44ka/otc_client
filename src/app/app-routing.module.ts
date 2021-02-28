import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { MainPageComponent } from './components/main-page/main-page.component';
import { DepartmentPageComponent } from './components/department-page/department-page.component';
import { EmployeePageComponent } from './components/employee-page/employee-page.component';
import { EmployeeUpdatePageComponent } from './components/employee-update-page/employee-update-page.component';
import { EmployeeNewPageComponent } from './components/employee-new-page/employee-new-page.component';

const routes: Routes = [
  {
    path: '',
    component: MainPageComponent
  },
  {
    path: 'department/:departmentId',
    component: DepartmentPageComponent
  },
  {
    path: 'employee/:employeeId',
    component: EmployeePageComponent
  },
  {
    path: 'employee-update/:employeeId',
    component: EmployeeUpdatePageComponent
  },
  {
    path: 'employee-new',
    component: EmployeeNewPageComponent
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
