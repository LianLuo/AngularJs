import { Injectable } from '@angular/core';
import { Order } from "../models/Order.model";
import { OrderItem } from "../models/order-item.model";
import { Customer } from "../models/customer.model";
import { environment } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class OrderService {

  formData:Order
  orderItems:OrderItem[] = [];

  private readonly postUrl=`${environment.apiUrl}/order`;

  constructor(
    private http:HttpClient
  ) { }

  saveOrder(){
    this.formData.OrderID = 0;
    const body = {
      ...this.formData,
      OrderItems:this.orderItems
    };
    const url = `${this.postUrl}/addOrder`;
    return this.http.post(url,body);
  }

  updateOrder(){
    const body = {
      ...this.formData,
      OrderItems:this.orderItems
    };
    const url = `${this.postUrl}/updateOrder`;
    return this.http.post(url,body);
  }

  fetchOrderList(){
    const url = `${this.postUrl}/orders`;
    return this.http.get(url);
  }

  fetchOrderItemById(orderID:number){
    const url = `${this.postUrl}`;
    return this.http.get(url+'/'+orderID);
  }

  /**
   * delete order record by orderID
   * @param orderID the primary key for order
   */
  deleteOrderById(orderID:number){
    const url = `${this.postUrl}/${orderID}`;
    return this.http.delete(url);
  }
}
