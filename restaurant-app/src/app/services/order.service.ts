import { Injectable } from '@angular/core';
import { Order } from "../models/Order.model";
import { OrderItem } from "../models/order-item.model";
import { Customer } from "../models/customer.model";

@Injectable({
  providedIn: 'root'
})
export class OrderService {

  formData:Order
  orderItems:OrderItem[] = [];
  customerList:Customer[] = [];
  constructor() { }
}
