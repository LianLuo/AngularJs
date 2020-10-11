import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { Employee } from 'src/app/models/employee.model';
import { EmployeeService } from 'src/app/services/employee.service';

@Component({
  selector: 'app-employee-list',
  templateUrl: './employee-list.component.html',
  styles: [
  ]
})
export class EmployeeListComponent implements OnInit {

  list: Employee[];
  constructor(
    private service: EmployeeService,
    private toastr: ToastrService
  ) { }

  ngOnInit(): void {
    this.service.getEmployees().subscribe(res => {
      this.list = res.map(item => {
        return {
          id: item.payload.doc.id,
          ...item.payload.doc.data() as any
        } as Employee;
      });
    });
  }

  onEdit(emp: Employee) {
    this.service.formData = Object.assign({}, emp);
  }

  onDelete(emp: Employee) {
    if (confirm("Are you sure to delete this record?")) {
      this.service.deleteEmployee(emp.id);
      this.toastr.info('Deleted successful.', "EMP. Register");
    }
  }

}
