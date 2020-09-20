import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { PaymentDetail } from 'src/app/models/payment-detail.model';
import { PaymentDetailService } from 'src/app/services/payment-detail.service';

@Component({
  selector: 'app-payment-detail',
  templateUrl: './payment-detail.component.html',
  styles: [
  ]
})
export class PaymentDetailComponent implements OnInit {

  constructor(
    public service: PaymentDetailService,
    private toastr:ToastrService
  ) { }

  ngOnInit(): void {
    this.resetForm();
  }

  resetForm(form?: NgForm) {
    this.service.refreshList();
    if(form != null){
      form.resetForm();
    }else{
      this.service.formData = {
        EMPID: 0,
        CardOwnerName: "",
        CardNumber: "",
        ExpiretionDate: '',
        CVV: ""
      } as PaymentDetail;
    }    
  }

  onSubmit(form:NgForm){

    const payment = form.value as PaymentDetail;
    this.service.formData = payment;
    if(payment.EMPID != 0){
      this.service.updatePaymentDetail().subscribe(res=>{
        this.toastr.success("Updated Successful","Payment Detail Register.");
        this.resetForm(form);
      });
    }else{
      this.service.createPaymentDetail().subscribe(res=>{
        this.toastr.warning("Inserted Successful","Payment Detail Register.")
        this.resetForm(form);
      });
    }
  }
}
