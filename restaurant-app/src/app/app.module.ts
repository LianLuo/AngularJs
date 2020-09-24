import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { RouterModule } from '@angular/router';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { OrdersComponent } from './orders/orders.component';
import { OrderComponent } from './orders/order/order.component';
import { OrderItemComponent } from './orders/order-item/order-item.component';
import { OrderService } from './services/order.service';
import { CustomerService } from './services/customer.service';
import { ItemService } from './services/Item.service';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatDialogModule } from '@angular/material/dialog'

@NgModule({
  declarations: [
    AppComponent,
    OrdersComponent,
    OrderComponent,
    OrderItemComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule.forRoot([
      { path: '', redirectTo: 'order', pathMatch: 'full' },
      { path: 'orders', component: OrderComponent },
      {
        path: 'order', children: [
          { path: '', component: OrderComponent },
          { path: 'edit/:id', component: OrderComponent }
        ]
      }
    ]),
    BrowserAnimationsModule,
    MatDialogModule
  ],
  providers: [
    OrderService,
    CustomerService,
    ItemService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
