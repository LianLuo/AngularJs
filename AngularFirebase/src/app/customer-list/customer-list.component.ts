import { Component, OnInit } from '@angular/core';
import { CustomerService } from '../services/customer.service';

@Component({
  selector: 'app-customer-list',
  templateUrl: './customer-list.component.html',
  styles: [
  ]
})
export class CustomerListComponent implements OnInit {

  customerArray = [];
  showDeleteMessage:boolean;
  searchText:string = "";
  constructor(
    public service:CustomerService
  ) { }

  ngOnInit(): void {
    this.service.getCustomers().subscribe(res=>{
      this.customerArray = res.map(item=>{
        return {
          $key:item.key,
          ...item.payload.val()
        };
      })
    });
  }

  onDelete(key){
    if(confirm('Are you sure to delete this record?')){
      this.service.deleteCustomer(key);
      this.showDeleteMessage = true;
      setTimeout(() => {
        this.showDeleteMessage = false;
      }, 3000);
    }
  }

  filterCondition(customer){
    return customer.fullName.toLowerCase().indexOf(this.searchText.toLowerCase()) != -1;
  }

}
