import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { MainPageModule } from './components/main-page/main-page.module';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { DepartmentPageModule } from './components/department-page/department-page.module';
import { EmployeePageModule } from './components/employee-page/employee-page.module';
import { EmployeeUpdatePageModule } from './components/employee-update-page/employee-update-page.module';
import { EmployeeNewPageModule } from './components/employee-new-page/employee-new-page.module';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    MainPageModule,
    DepartmentPageModule,
    EmployeePageModule,
    NoopAnimationsModule,
    EmployeeUpdatePageModule,
    EmployeeNewPageModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
