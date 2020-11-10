
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ReactiveFormsModule } from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';
import { HttpClientModule, HTTP_INTERCEPTORS, HttpClient } from '@angular/common/http';
import { AgGridModule } from 'ag-grid-angular';
import { Routes, RouterModule } from '@angular/router';
import { SidebarModule } from 'ng-sidebar';

import { JwtInterceptor } from './_helpers/jwt.interceptor';
import { ErrorInterceptor } from './_helpers/error.interceptor';

import { AppComponent } from './app.component';
import { DashboardComponent } from './shared/dashboard/dashboard.component';
import { EmployeeModule } from './employee/employee.module';
import { EmployeeService } from './services/employee.service';
import { EmployeeRoutingModule } from './employee/employee-routing.module';
import { BsDatepickerModule, DatepickerModule } from 'ngx-bootstrap/datepicker';
import { ToastrModule } from 'ngx-toastr';
import { EmployeeComponent } from './employee/employee.component';
import { SidebarComponent } from './shared/sidebar/sidebar.component';
import { AlertComponent } from './core/alert/alert.component';

// used to create fake backend
import { fakeBackendProvider } from './_helpers/fake-backend';


@NgModule({
  declarations: [
    AppComponent,
    DashboardComponent,
    EmployeeComponent,
    SidebarComponent,
    AlertComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    RouterModule,
    EmployeeRoutingModule,
    HttpClientModule,
    ToastrModule.forRoot(),
    SidebarModule.forRoot(),
    ReactiveFormsModule,
    AgGridModule.withComponents([]),
    EmployeeModule
  ],
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: JwtInterceptor, multi: true },
    { provide: HTTP_INTERCEPTORS, useClass: ErrorInterceptor, multi: true },

    // provider used to create fake backend
    fakeBackendProvider
  ],
  bootstrap: [AppComponent]
})
export class AppModule { };