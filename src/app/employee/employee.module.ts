import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BrowserModule } from '@angular/platform-browser';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { AgGridModule } from 'ag-grid-angular';
import { DatepickerModule, BsDatepickerModule } from 'ngx-bootstrap/datepicker';
import { RouterModule } from '@angular/router';

import { ProjectComponent } from './project/project.component';
import { PersonalDetailComponent } from './personal-detail/personal-detail.component'; 
import { EmployeeService } from '../services/employee.service';
import { PersonListComponent } from './person-list/person-list.component';
import { AddPersonComponent } from './add-person/add-person.component'; 



@NgModule({
  declarations: [
    ProjectComponent, PersonalDetailComponent, PersonListComponent, AddPersonComponent,
    //EmployeeComponent
  ],
  imports: [
    BrowserModule,
    CommonModule,
    RouterModule,
    ReactiveFormsModule,
    HttpClientModule,
    AgGridModule,
    BsDatepickerModule.forRoot(),
    DatepickerModule.forRoot() ,
  ],
  providers: [
    EmployeeService, 
    HttpClientModule
   ]
})
export class EmployeeModule { }
