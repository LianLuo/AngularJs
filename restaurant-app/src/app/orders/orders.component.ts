import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { OrderService } from '../services/order.service';

@Component({
  selector: 'app-orders',
  templateUrl: './orders.component.html',
  styles: []
})
export class OrdersComponent implements OnInit {

  orderList: any[];

  constructor(
    private service: OrderService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.service.fetchOrderList().subscribe((res: any) => {
      this.orderList = res;
    });
  }

  openForEdit(orderID: number) {
    this.router.navigate(['/order/edit/' + orderID]);
  }

  onDelete(orderID: number, orderIndex: number) {
    if (confirm("Are you sure to delete this record?")) {
      this.service.deleteOrderById(orderID).subscribe(res => {
        this.orderList.splice(orderIndex, 1);
      });
    }
  }

}
