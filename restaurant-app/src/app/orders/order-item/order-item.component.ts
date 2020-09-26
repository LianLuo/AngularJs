import { Component, Inject, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Item } from 'src/app/models/item.model';
import { OrderItem } from 'src/app/models/order-item.model';
import { CommonService } from 'src/app/services/common.service';
import { OrderService } from 'src/app/services/order.service';

@Component({
  selector: 'app-order-item',
  templateUrl: './order-item.component.html',
  styles: [
  ]
})
export class OrderItemComponent implements OnInit {

  formData: OrderItem;
  items: Item[] = [];
  isValid: boolean = true;
  constructor(
    @Inject(MAT_DIALOG_DATA) public data,
    public dialogref: MatDialogRef<OrderItemComponent>,
    public commonService: CommonService,
    private service: OrderService
  ) { }

  ngOnInit(): void {
    //this.commonService.fetchItems();
    if(this.data.orderItemIndex == null){
      this.formData = {
        Price: 0,
        OrderItemID: null,
        OrderID: this.data.OrderID,
        Total: 0,
        Quantity: 0,
        ItemID: 0,
        ItemName: ''
      };
    }else{
      this.formData = Object.assign({},this.service.orderItems[this.data.orderItemIndex]);
    }
  }

  onChangeItem(ctrl) {
    if (ctrl.selectedIndex == 0) {
      this.formData.Price = 0;
      this.formData.ItemName = "";
    }
    else {
      this.formData.Price = this.commonService.itemsList[ctrl.selectedIndex - 1].Price;
      this.formData.ItemName = this.commonService.itemsList[ctrl.selectedIndex - 1].ItemName;
    }
    this.updateTotal();
  }

  updateTotal() {
    this.formData.Total = parseFloat((this.formData.Quantity * this.formData.Price).toFixed(2));
  }

  onAddOrUpdate(form: NgForm) {
    if (this.validateForm(form.value)) {
      if (this.data.orderItemIndex == null) {
        this.service.orderItems.push(form.value);
      } else {
        this.service.orderItems[this.data.orderItemIndex] = form.value;
      }

      this.dialogref.close();
    }

  }

  private validateForm(formData: OrderItem) {
    this.isValid = true;
    if (formData.ItemID == 0 || formData.Quantity == 0) {
      this.isValid = false;
    }
    return this.isValid;
  }
}
