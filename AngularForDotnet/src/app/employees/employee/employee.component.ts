import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { EmployeeService } from "../../services/employee.service";
import { ToastrService } from 'ngx-toastr';
import { Employee } from 'src/app/models/employee.model';

@Component({
  selector: 'app-employee',
  templateUrl: './employee.component.html',
  styleUrls: ['./employee.component.css']
})
export class EmployeeComponent implements OnInit {

  constructor(
    public service:EmployeeService,
    private toastr:ToastrService
  ) { }

  ngOnInit(): void {
    this.resetForm();
  }

  onSubmit(form:NgForm){
    if(form.value.EmployeeID == null)
    {
      form.value.EmployeeID=0;
      this.service.createEmployee(form.value).subscribe(res=>{
        this.resetForm(form);
        this.toastr.success('Inserted Successful.','EMP. Register');
        this.service.getEmployees();
      });
    }else
    {
      this.service.updateEmployee(form.value).subscribe(res=>{
        this.resetForm(form);
        this.toastr.info("Updated Successful.","EMP. Register.");
        this.service.getEmployees();
      });
    }
  }

  resetForm(form?:NgForm){
    if(null != form)
    {
      form.resetForm();
    }else{
      this.service.formData = {
        EmployeeID:null,
        FullName:'',
        EMPCode:'',
        Mobile:'',
        Position:''
      };
    }   
    
  }
}
