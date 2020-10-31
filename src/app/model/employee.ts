import { Identifiers } from '@angular/compiler';

export class Employee {
    
    Code : number ;
    Title :string;
    FirstName : string;
    MiddleName : string;
    LastName : string;
    Nationality : string;
    BirthDate : Date;
    Gender : string;
    Active :boolean;
    Remark : string;
    Projects: [
        id: number,
        Name: string,
        Description:string,
        Code:number
    ];
}
