import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {EmployeePageComponent} from './employee-page.component';
import {MatCardModule} from '@angular/material/card';
import {MatButtonModule} from '@angular/material/button';
import {MatIconModule} from '@angular/material/icon';



@NgModule({
  declarations: [EmployeePageComponent],
  imports: [
    CommonModule,
    MatCardModule,
    MatButtonModule,
    MatIconModule
  ]
})
export class EmployeePageModule { }
