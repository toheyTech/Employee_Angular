
import { Component, OnInit, ViewChild, Output } from '@angular/core';
import { ColDef, GridApi, ColumnApi, GridOptions } from 'ag-grid-community';
import { FormArray, Validators, FormBuilder, FormGroup } from '@angular/forms';
import { BsDatepickerConfig } from 'ngx-bootstrap/datepicker';
import { ToastrService } from 'ngx-toastr';
import { Router, ActivatedRoute } from '@angular/router';

import { EmployeeService } from '../../services/employee.service';
import { Employee } from '../../model/employee';
import { Project } from '../../model/project';
import { from } from 'rxjs';

@Component({
  selector: 'app-personal-detail',
  templateUrl: './personal-detail.component.html',
  styleUrls: ['./personal-detail.component.scss', '../employee.component.scss']
})
export class PersonalDetailComponent implements OnInit {

  datePickerConfig: Partial<BsDatepickerConfig>;
  employeeIdUpdate = null;
  dataSaved = false;
  massage = null;
  selectedRows: any;
  public projectData: Project[];
  public employees: Employee[];

  public columnDefs: ColDef[];   // row data and column definitions
  // gridApi and columnApi  
  private gridApi: GridApi;
  private columnApi: ColumnApi;
  public employeeId: any;
  gridOptions: GridOptions; //Declare gridoptions

  submitted: boolean = false;
  employeeForm: FormGroup; // form name
  currentEmployee = null;
  Title: any = ['ATO', 'WRO', 'W/T'];
  Gender: any = ['Male', 'Female'];
  Nationality: any = ['Ethiopia', 'Kenya', 'Sudan', 'South Sudan', 'Djibuti'];

  constructor(private formBuilder: FormBuilder, private route: ActivatedRoute, private router: Router, private employeeService: EmployeeService, private toastr: ToastrService) {
    this.columnDefs = this.createColumnDefs();
    this.datePickerConfig = Object.assign({},
      {
        containerClass: 'theme-dark-blue'
      });


    this.gridOptions = {
      columnDefs: this.createColumnDefs(),
      masterDetail: true,
      detailCellRendererParams: {

        // provide the Grid Options to use on the Detail Grid
        detailGridOptions: {
          columnDefs: [
            { field: 'callId' },
            { field: 'direction' },
            { field: 'number' }
          ]
        },

        // get the rows for each Detail Grid
        getDetailRowData: function (params) {
          params.successCallback(params.data.callRecords);
        }
      }
      // onRowDoubleClicked(): this.onRowDoubleClicked(any)

    }

  }

  ngOnInit() {

    this.initializeEmployeeForm();
    this.getEmployeeList();
    //this.onSelection();
    console.log(this.route.snapshot.paramMap.get('id'));
    this.getEmployeeByID(this.route.snapshot.paramMap.get('id'));
  }

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

  // one grid initialisation, grap the APIs and auto resize the columns to fit the available space  
  public onGridReady(params): void {
    this.gridApi = params.api;
    this.columnApi = params.columnApi;
    this.gridApi.sizeColumnsToFit();
  }

  // create column definitions  
  private createColumnDefs() {
    return [
      //   {
      //   headerName: 'Code',
      //   field: 'Code',
      //   filter: false,
      //   editable: false,
      //   sortable: false,
      //   cellRenderer: 'agGroupCellRenderer'
      // },
      {
        headerName: 'Title',
        field: 'Title',
        filter: false,
        editable: false,
        sortable: false
      }, {
        headerName: 'First Name',
        field: 'FirstName',
        filter: true,
        editable: false,
        sortable: true
      }, {
        headerName: 'Middle Name',
        field: 'MiddleName',
        filter: true,
        editable: false,
        sortable: true
      }, {
        headerName: 'Last Name',
        field: 'LastName',
        filter: true,
        editable: false,
        sortable: true
      },
      {
        headerName: 'Gender',
        field: 'Gender',
        filter: false,
        sortable: false,
        editable: false,
      }, {
        headerName: 'Nationality',
        field: 'Nationality',
        filter: true,
        editable: false,
        sortable: true
      }, {
        headerName: 'Date of Birth',
        field: 'BirthDate',
        filter: true,
        editable: false
      }, {
        headerName: 'Status',
        field: 'Active',
        filter: true,
        editable: false,
        cellRenderer: params => {
          return `<input type='checkbox' ${params.value ? 'checked' : ''} />`;
        }
      }, {
        headerName: 'Remark',
        field: 'Remark',
        filter: true,
        editable: false
      }
    ]
  }
  status: any;
  onBtnClick1(e) {
    // this.rowDataClicked1 = e.rowData;
    this.deleteEmployee();
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

  // get Employee By Code
  public getEmployeeByID(id) {
    this.employeeService.getEmployeeDetailById(id).subscribe(data => {
      this.currentEmployee = data;
      this.onSelectionData();
    })
  }

  // get Employee List
  public getEmployeeList() {
    this.employeeService.getEmployeesWithProject().subscribe(data => {
      //console.log(data);
      this.employees = data

    })
  }

  // save method which include creating new and updating existing
  public CreateEmployee(employee: Employee) {
    console.log(this.employeeForm.value);
    if (this.employeeIdUpdate == null) {
      this.employeeService.addEmployee(employee).subscribe(
        () => {

          this.dataSaved = true;
          this.toastr.success("successfully created ");
          this.getEmployeeList();
          this.employeeIdUpdate = null;
          this.initializeEmployeeForm();
        }
      );
    } else {

      employee.Code = this.employeeIdUpdate;
      console.log(employee.Code);
      this.employeeService.updateEmployee(employee.Code, employee).subscribe(() => {
        this.dataSaved = true;
        this.toastr.success("successfully updated ");
        this.getEmployeeList();
        this.employeeIdUpdate = null;
        this.employeeForm.reset();
        this.router.navigate(['/employee/person-list']);
      });
    }
  }

  // // on row selecting change
  public onSelectionData() {
    this.employeeIdUpdate = this.currentEmployee[0].Code;
    this.employeeForm.controls['Title'].setValue(this.currentEmployee[0].Title);
    this.employeeForm.controls['FirstName'].setValue(this.currentEmployee[0].FirstName);
    this.employeeForm.controls['MiddleName'].setValue(this.currentEmployee[0].MiddleName);
    this.employeeForm.controls['LastName'].setValue(this.currentEmployee[0].LastName);
    this.employeeForm.controls['Gender'].setValue(this.currentEmployee[0].Gender);
    this.employeeForm.controls['Nationality'].setValue(this.currentEmployee[0].Nationality);
    this.employeeForm.controls['BirthDate'].setValue(new Date(this.currentEmployee[0].BirthDate)); //this.selectedRows[0].BirthDate
    this.employeeForm.controls['Active'].setValue(this.currentEmployee[0].Active);
    this.employeeForm.controls['Remark'].setValue(this.currentEmployee[0].Remark);
    this.projectData = this.currentEmployee[0].Projects;
    this.employeeForm.setControl('projects', this.setExistingProject(this.projectData));

  }

  public onRowClicked($event: any) {
    console.log("yep");
    //this.router.navigate(['/employee/project']);
  }

  //Delete user  
  public deleteEmployee() {
    debugger;
    if (this.currentEmployee.length == 0) {
      this.toastr.error("error", "Please select a Employee for deletion");
      return;
    }
    this.employeeService.deleteEmployee(this.currentEmployee[0].Code).subscribe(data => {
      this.toastr.success("successfully deleted ", data);
      this.ngOnInit();
    });
  }

  // reset form
  public resetForm() {

    const selectedRows = this.gridApi.getSelectedRows();
    // console.log();
    this.gridApi.deselectAll();
    this.initializeEmployeeForm();
    this.employeeIdUpdate = null;
    this.massage = null;
    this.dataSaved = false;
  }
}

