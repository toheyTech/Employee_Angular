
import { Component, OnInit } from '@angular/core';
import { FormArray, Validators, FormBuilder, FormGroup } from '@angular/forms';
import { BsDatepickerConfig } from 'ngx-bootstrap/datepicker';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';

import { EmployeeService } from '../../services/employee.service';
import { Employee } from '../../model/employee';
import { Project } from '../../model/project';

@Component({
  selector: 'app-add-person',
  templateUrl: './add-person.component.html',
  styleUrls: ['./add-person.component.scss', '../employee.component.scss']
})
export class AddPersonComponent implements OnInit {

  datePickerConfig: Partial<BsDatepickerConfig>;
  employeeForm: FormGroup; // form name

  employeeIdUpdate = null;
  massage = null;
  submitted: boolean = false;
  dataSaved: boolean = false;

  public projectData: Project[];
  public employees: Employee[];
  Title: any = ['ATO', 'WRO', 'W/T'];
  Gender: any = ['Male', 'Female'];
  Nationality: any = ['Ethiopia', 'Kenya', 'Sudan', 'South Sudan', 'Djibuti'];

  constructor(private formBuilder: FormBuilder, private router: Router, private employeeService: EmployeeService, private toastr: ToastrService) {
    this.datePickerConfig = Object.assign({},
      {
        containerClass: 'theme-dark-blue'
      });

  }

  ngOnInit() {

    this.initializeEmployeeForm();
  }
  
// initialize employee form on Component initilization
  public initializeEmployeeForm() {
    this.employeeForm = this.formBuilder.group({
      "Title": ["", Validators.required],
      "FirstName": ["", [Validators.required, Validators.minLength(3), Validators.maxLength(10)]],
      "MiddleName": ["", [Validators.required, Validators.minLength(3), Validators.maxLength(10)]],
      "LastName": ["", [Validators.required, Validators.minLength(3), Validators.maxLength(10)]],
      "Nationality": ["", Validators.required],
      "BirthDate": ["", Validators.required],
      "Gender": ["", Validators.required],
      "Active": ["", Validators.requiredTrue],
      "Remark": ["",],
      "projects": this.formBuilder.array([this.newProject()]),
    });
  }

  // create form array
  public get projects(): FormArray {
    return this.employeeForm.get("projects") as FormArray;
  }

  // intialize employee Form
  private newProject(): FormGroup {
    return this.formBuilder.group({
      "Code": [0,],
      "Name": ["",],
      "Description": ["",],
    })
  }

  // add project Form Array
  public addProjects() {
    this.projects.push(this.newProject());
  }

  // remove project Form Array
  public removeProject(i: number) {
    if (this.projects.length > 1) {
      this.projects.removeAt(i);
    }
  }

  // set existing Data to Form Array
  setExistingProject(projectSet: Project[]): FormArray {

    const formArray = new FormArray([]);
    projectSet.forEach(s => {
      formArray.push(this.formBuilder.group({
        Id: s.Id,
        Code: s.Code,
        Name: s.Name,
        Description: s.Description
      }))
    })
    return formArray;
  }

  // Choose nationality using select dropdown
  public changeNationality(e) {
    this.Nationality.setValue(e.target.value, {
      onlySelf: true
    })
  }

  // Choose Gender using select dropdown
  public changeGender(e) {
    this.Gender.setValue(e.target.value, {
      onlySelf: true
    })
  }
  //
  public changeTitle(e) {
    this.Title.setValue(e.target.value, {
      onlySelf: true
    })
  }

  onFormSubmit() {
    this.dataSaved = false;
    const employee = this.employeeForm.value;
    this.CreateEmployee(employee);
    this.employeeForm.reset();
  }

  // save method which include creating new and updating existing
  public CreateEmployee(employee: Employee) {
    console.log(this.employeeForm.value);
    if (this.employeeIdUpdate == null) {
      this.employeeService.addEmployee(employee).subscribe(
        () => {
          this.dataSaved = true;
          this.toastr.success("successfully created ");
          this.resetForm();
          this.router.navigate(['/employee/person-list']);

        }
      );
    } else {

      employee.Code = this.employeeIdUpdate;
      this.employeeService.updateEmployee(employee.Code, employee).subscribe(() => {
        this.dataSaved = true;
        this.toastr.success("successfully updated ");
        this.resetForm();
        this.router.navigate(['/employee/person-list']);
      });
    }
  }

  // reset form
  public resetForm() {
    this.initializeEmployeeForm();
  }
}

