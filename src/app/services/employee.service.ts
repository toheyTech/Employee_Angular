import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

import { environment } from '../../environments/environment';
import { Employee } from '../model/employee';
import { Project } from '../model/project';

@Injectable({ providedIn: 'root' })

export class EmployeeService {

    private personUrl = environment.rootUrl + 'People/'; // person url
    private projectUrl = environment.rootUrl + 'Projects/'; // project url

    constructor(private http: HttpClient) { }

    public getEmployeeDetailById(Code: string): Observable<Employee> {
        return this.http.get<Employee>(this.personUrl + `GetPeopleDetailById/` + Code);
    }
                                                                                                                                      b                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                   
    // get list of employees service
    public getEmployees(): Observable<Employee[]> {
        return this.http.get<Employee[]>(this.personUrl + `GetPeopleDetails`);
    }

    // get list of employees service with Project
    public getEmployeesWithProject(): Observable<Employee[]> {
        return this.http.get<Employee[]>(  this.personUrl + `GetPeopleDetailWithProjects`);
    }

    // get list of projects service
    public getprojects(): Observable<Project[]> {
        return this.http.get<Project[]>(this.projectUrl + `GetProjectDetails`);
    }


    // create employee service
    public addEmployee(employee: Employee): Observable<string> {

        const httpOptions = {
            headers: new HttpHeaders({
                'Content-Type': 'application/json'
            })
        };
        return this.http.post<string>( this.personUrl + `InsertPeopleDetails/`, employee, httpOptions);
    }

    // create project service
    public addProject(project: Project): Observable<string> {

        const httpOptions = {
            headers: new HttpHeaders({
                'Content-Type': 'application/json'
            })
        };
        return this.http.post<string>( this.projectUrl + `InsertProjectDetails/`, project, httpOptions);
    }

    // update employee
    public updateEmployee(Code: number, employee: Employee): Observable<string> {
        const httpOptions = {
            headers: new HttpHeaders({
                'Content-Type': 'application/json'
            })
        };
        return this.http.put<string>( this.personUrl + `UpdatePeopleDetails/` + Code, employee, httpOptions);
    }

    // update project
    public updateProject(id: number, project: Project): Observable<string> {
        const httpOptions = {
            headers: new HttpHeaders({
                'Content-Type': 'application/json'
            })
        };
        return this.http.put<string>(this.projectUrl + `UpdateProjectDetails/` + id, project, httpOptions);
    }

    // delete employee
    public deleteEmployee(Code: string): Observable<string> {
        const httpOptions = {
            headers: new HttpHeaders({
                'Content-Type': 'application/json'
            })
        };
        return this.http.delete<string>(this.personUrl + `DeletePeopleDetails/` + Code, httpOptions);
    }

    // delete Project
    public deleteProject(id: number): Observable<string> {
        const httpOptions = {
            headers: new HttpHeaders({
                'Content-Type': 'application/json'
            })
        };
        return this.http.delete<string>( this.projectUrl + `DeleteProjectDetails/` + id, httpOptions);
    }
}  
