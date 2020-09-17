import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http'
import { Employee } from "../models/employee.model";
import { environment } from "../../environments/environment";

@Injectable({
  providedIn: 'root'
})
export class EmployeeService  {

  formData:Employee;
  list:Employee[];
  private readonly employeeUrl = `${environment.apiBaseUrl}employee`;
  private headerOption = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  };

  constructor(
    private http:HttpClient
  ) { }

  getEmployeeById(employeeId:number){
    return this.http.get(this.employeeUrl+`/${employeeId}`);
  }

  getEmployees(){
    return this.http.get(this.employeeUrl).toPromise().then(res=>{
      console.info(res);
      this.list = res as Employee[];
    });
  }

  createEmployee(emp:Employee){
    console.info(emp,this.employeeUrl);
    return this.http.post(this.employeeUrl,emp, this.headerOption);
  }

  updateEmployee(employee:Employee){
    return this.http.put(this.employeeUrl+`/${employee.EmployeeID}`, employee);
  }

  deleteEmployee(employee:Employee|number){
    const id = typeof(employee) == 'number'?employee:employee.EmployeeID;
    return this.http.delete(this.employeeUrl+`/${id}`);
  }
}
