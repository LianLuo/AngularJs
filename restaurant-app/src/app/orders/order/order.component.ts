import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { OrderService } from 'src/app/services/order.service';
import { OrderItemComponent } from '../order-item/order-item.component';

@Component({
  selector: 'app-order',
  templateUrl: './order.component.html',
  styles: [
  ]
})
export class OrderComponent implements OnInit {

  constructor(
    public service: OrderService,
    private dialog: MatDialog
  ) { }

  ngOnInit(): void {
    this.resetForm();
  }

  resetForm(form?: NgForm) {
    if (form != null) {
      form.reset();
    }
    else {
      this.service.formData = {
        OrderID: null,
        OrderNum: Math.floor(100000 + Math.random() * 900000).toString(),
        CustomerID: 0,
        PostMethod: '',
        TotalRevenu: 0
      };
    }
  }

  onAddItem(orderItemIndex: number, OrderID: number) {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.autoFocus = true;
    dialogConfig.disableClose = true;
    dialogConfig.width = "50%";
    dialogConfig.data = {
      orderItemIndex, OrderID
    };
    this.dialog.open(OrderItemComponent, dialogConfig);
  }
}
