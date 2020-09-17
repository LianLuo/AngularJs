import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { Employee } from 'src/app/models/employee.model';
import { EmployeeService } from 'src/app/services/employee.service';

@Component({
  selector: 'app-employee-list',
  templateUrl: './employee-list.component.html',
  styleUrls: ['./employee-list.component.css']
})
export class EmployeeListComponent implements OnInit {

  constructor(
    public service:EmployeeService,
    private toastr:ToastrService
  ) { }

  ngOnInit(): void {
    this.service.getEmployees();
  }

  onSelected(emp:Employee){
    this.service.formData = Object.assign({},emp);
  }
  onDelete(emp:Employee|number){
    if(confirm("Are you sure to delete this recored?"))
    {
      this.service.deleteEmployee(emp).subscribe(res=>{
        this.toastr.success("Deleted Successful.","Employee Register.");
        this.service.getEmployees();
      });
    }
  }
}
