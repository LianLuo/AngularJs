import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { EmployeeService } from 'src/app/services/employee.service';
import { AngularFirestore } from "@angular/fire/firestore";
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-employee',
  templateUrl: './employee.component.html',
  styles: [
  ]
})
export class EmployeeComponent implements OnInit {

  constructor(
    public service:EmployeeService,
    private firebase:AngularFirestore,
    private toastr:ToastrService
  ) { }

  ngOnInit(): void {
    this.resetForm();
  }

  resetForm(form?:NgForm){
    if(form != null){
      form.reset();
    }    
    this.service.formData = {
      id:null,
      fullName:'',
      empCode:'',
      position:'',
      mobile:''
    };
  }

  onSubmit(form:NgForm){
    let data = Object.assign({},form.value);
    delete data.id;
    if(form.value.id == null){
      this.firebase.collection("employees").add(data);
    }else{
      this.firebase.doc("employees/"+form.value.id).update(data);
    }
    this.resetForm(form);
    this.toastr.success('Submitted successful.',"EMP. Register");
  }
}
