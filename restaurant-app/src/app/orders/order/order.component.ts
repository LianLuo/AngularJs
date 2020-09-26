import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';
import { Order } from 'src/app/models/Order.model';
import { CommonService } from 'src/app/services/common.service';
import { OrderService } from 'src/app/services/order.service';
import { OrderItemComponent } from '../order-item/order-item.component';

@Component({
  selector: 'app-order',
  templateUrl: './order.component.html',
  styles: [
  ]
})
export class OrderComponent implements OnInit {

  isValid:boolean = true;

  constructor(
    public service: OrderService,
    public commonService: CommonService,
    private dialog: MatDialog,
    private router:Router,
    private route:ActivatedRoute
  ) { }

  ngOnInit(): void {
    this.resetForm();
    this.updateTotal();
    let orderID = this.route.snapshot.paramMap.get('id');
    if(orderID != null){
      this.service.fetchOrderItemById(parseInt(orderID)).subscribe((res:any)=>{
          this.service.formData = res.OrderInfo;
          this.service.orderItems = res.OrderItems;
      })
    }
  }

  /**
   * clear form data
   * @param form current form
   */
  resetForm(form?: NgForm) {
    if (form != null) {
      form.reset();
    }
    else {
      this.service.formData = {
        OrderID: null,
        OrderNum: Math.floor(100000 + Math.random() * 900000).toString(),
        CustomerID: 0,
        PaymentID: 0,
        TotalRevenu: 0
      };
    }
    this.service.orderItems = [];
  }

  onAddItem(orderItemIndex: number, OrderID: number) {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.autoFocus = true;
    dialogConfig.disableClose = true;
    dialogConfig.width = "50%";
    dialogConfig.data = {
      orderItemIndex, OrderID
    };
    this.dialog.open(OrderItemComponent, dialogConfig).afterClosed().subscribe(res=>{
      this.updateTotal();
    });
  }

  /**
   * 
   * @param orderItemID orderItemID
   * @param index orderItem index
   */
  onDelete(orderItemID: number, index: number) {
    if (confirm("Are you sure to delete this record?")) {
      this.service.orderItems.splice(index,1);
      this.updateTotal();
    }
  }

  /**
   * validate fill customer and orderItem
   * @param form current form data
   */
  validateForm(form:Order){
    this.isValid = true;
    if(form.CustomerID == 0 || form.TotalRevenu == 0 || this.service.orderItems.length == 0){
      this.isValid = false;
    }
    return this.isValid;
  }

  onSaveOrUpdate(form:NgForm){
    if(this.validateForm(form.value)){
      if(this.service.formData.OrderID == null || this.service.formData.OrderID == 0){
        this.service.saveOrder().subscribe(res=>{
          this.router.navigate(['/orders']);
        });
      }else{
        this.service.updateOrder().subscribe(res=>{
          this.router.navigate(['/orders']);
        });
      }
      
    }
  }

  updateTotal(){
    let total = this.service.orderItems.reduce((pre,curr)=>{
      return pre+curr.Total;
    },0);
    this.service.formData.TotalRevenu = total;
  }
}
