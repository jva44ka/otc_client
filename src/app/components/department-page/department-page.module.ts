import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from '../../shared/shared.module';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { DepartmentPageComponent } from './department-page.component';
import { MatIconModule } from '@angular/material/icon';



@NgModule({
  declarations: [DepartmentPageComponent],
  imports: [
    CommonModule,
    SharedModule,
    MatCardModule,
    MatButtonModule,
    MatIconModule
  ]
})
export class DepartmentPageModule { }
