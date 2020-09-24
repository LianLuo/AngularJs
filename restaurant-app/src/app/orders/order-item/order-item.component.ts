import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Item } from 'src/app/models/item.model';
import { OrderItem } from 'src/app/models/order-item.model';
import { ItemService } from 'src/app/services/Item.service';

@Component({
  selector: 'app-order-item',
  templateUrl: './order-item.component.html',
  styles: [
  ]
})
export class OrderItemComponent implements OnInit {

  formData: OrderItem;
  items:Item[] = [];
  constructor(
    @Inject(MAT_DIALOG_DATA) public data,
    public dialogref: MatDialogRef<OrderItemComponent>,
    public itemService: ItemService
  ) { }

  ngOnInit(): void {
    this.formData = {
      Price: 0,
      OrderItemID: null,
      OrderID: this.data.OrderID,
      Total: 0,
      Quantity: 0,
      ItemID: 0,
      ItemName: ''
    };

    this.initialItems();
  }

  initialItems(){
    this.itemService.fetchItemAsync().subscribe(res=>{
      this.items = res;
    });
  }

  onChangeItem(ctrl){
    if(ctrl.selectedIndex == 0)
    {
      this.formData.Price = 0;
      this.formData.ItemName = "";
    }
    else{
      this.formData.Price = this.items[ctrl.selectedIndex - 1].Price;
      this.formData.ItemName = this.items[ctrl.selectedIndex - 1].Name;
    }
    this.updateTotal();
  }

  updateTotal(){
    this.formData.Total = parseFloat((this.formData.Quantity * this.formData.Price).toFixed(2));
  }

}
