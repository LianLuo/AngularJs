import { Component, OnInit } from '@angular/core';
import { CustomerService } from '../services/customer.service';

@Component({
  selector: 'app-customer',
  templateUrl: './customer.component.html',
  styles: [
  ]
})
export class CustomerComponent implements OnInit {

  
  constructor(
    public service: CustomerService
  ) { }

  submitted:boolean;
  showSuccessMessage:boolean;
  formControls = this.service.form.controls;

  ngOnInit(): void {
  }

  onSubmit(){
    this.submitted = true;
    if(this.service.form.valid){
      if(this.service.form.get('$key').value == null){
        this.service.insertCustomer(this.service.form.value);
      }else{
        this.service.updateCustomer(this.service.form.value);
      }
      
      this.showSuccessMessage = true;
      this.service.form.reset();
      this.submitted = false;
      setTimeout(() => {
        this.showSuccessMessage = false;
      }, 3000);
    }else{
      
    }
  }

}
