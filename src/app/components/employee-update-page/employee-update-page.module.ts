import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { EmployeeUpdatePageComponent } from './employee-update-page.component';
import { SharedModule } from '../../shared/shared.module';



@NgModule({
  declarations: [EmployeeUpdatePageComponent],
  imports: [
    CommonModule,
    SharedModule
  ]
})
export class EmployeeUpdatePageModule { }
