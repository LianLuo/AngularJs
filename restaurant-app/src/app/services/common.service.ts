import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { Item } from '../models/item.model';
import { Customer } from '../models/customer.model';
import { Payment } from "../models/payment.model";
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class CommonService {

  itemsList: Item[] = [];
  cusotemrsList: Customer[] = [];
  paymentsList: Payment[] = [];

  private commonHttpUrl = `${environment.apiUrl}/common/`;

  constructor(
    private http: HttpClient
  ) { 
    this.fetchCustomers();
    this.fetchItems();
    this.fetchPayments();
  }

  private fetchItems() {
    const url = `${this.commonHttpUrl}items`;
    this.http.get(url).subscribe(res => {
      this.itemsList = res as Item[];
    });
  }

  private fetchCustomers() {
    const url = `${this.commonHttpUrl}customers`;
    this.http.get(url).subscribe(res => {
      this.cusotemrsList = res as Customer[];
    });
  }

  private fetchPayments() {
    const url = `${this.commonHttpUrl}payments`;
    this.http.get(url).subscribe(res => {
      this.paymentsList = res as Payment[];
    });
  }
}
