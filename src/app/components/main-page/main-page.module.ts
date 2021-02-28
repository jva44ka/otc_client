import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from '../../shared/shared.module';
import { MainPageComponent } from './main-page.component';
import { HttpClientModule } from '@angular/common/http';
import { MatTableModule } from '@angular/material/table';
import { MatButtonModule } from '@angular/material/button';
import { DepartmentsListItemsComponent } from './departments-list-items/departments-list-items.component';
import { MatCardModule } from '@angular/material/card';



@NgModule({
  declarations: [MainPageComponent, DepartmentsListItemsComponent],
  imports: [
    CommonModule,
    SharedModule,
    HttpClientModule,
    MatTableModule,
    MatButtonModule,
    MatCardModule
  ]
})
export class MainPageModule { }
