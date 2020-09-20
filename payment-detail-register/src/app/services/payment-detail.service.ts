import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";

import { PaymentDetail } from "../models/payment-detail.model";
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class PaymentDetailService {

  formData:PaymentDetail;
  list:PaymentDetail[];

  httpUrl:string = `${environment.baseUrl}paymentDetail`;

  constructor(
    private http:HttpClient
  ) { }

  /**
   * refresh payment detail list.
   */
  refreshList(){
    this.fetchPaymentDetails().subscribe(res=>{
      this.list = res as [];
    });
  }

  /**
   * fetch payment detail by key id
   * @param id key id
   */
  getPaymentDetailById(id:number){
    return this.http.get(this.httpUrl+"/"+id);
  }

  /**
   * fetch all data for payment detail
   */
  fetchPaymentDetails(){
    return this.http.get(this.httpUrl);
  }

  /**
   * insert a new payment detail information.
   * @param payment payment detail object
   */
  createPaymentDetail(){
    return this.http.post(this.httpUrl, this.formData);
  }

  /**
   * update payment detail information.
   * @param payment need to update payment detail object
   */
  updatePaymentDetail(){
    const id = this.formData.EMPID;
    return this.http.put(this.httpUrl+"/"+id, this.formData);
  }

  deletePaymentDetail(payment:PaymentDetail | number){
    const id = typeof(payment) == "number"?payment:payment.EMPID;
    return this.http.delete(this.httpUrl+"/"+id);
  }
}
