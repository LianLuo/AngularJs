import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { HttpClientModule } from "@angular/common/http";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { ToastrModule } from "ngx-toastr";

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { PaymentDetailService } from "./services/payment-detail.service";
import { UserService } from "./services/user.service";
import { PaymentDetailsComponent } from './payment-details/payment-details.component';
import { PaymentDetailComponent } from './payment-details/payment-detail/payment-detail.component';
import { PaymentDetailListComponent } from './payment-details/payment-detail-list/payment-detail-list.component';
import { UserComponent } from './user/user.component';
import { RegistrationComponent } from './user/registration/registration.component';
import { LoginComponent } from './user/login/login.component';
import { HomeComponent } from './home/home.component';
import { AuthGuard } from "./auth/auth.guard";

@NgModule({
  declarations: [
    AppComponent,
    PaymentDetailsComponent,
    PaymentDetailComponent,
    PaymentDetailListComponent,
    UserComponent,
    RegistrationComponent,
    LoginComponent,
    HomeComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule, 
    ReactiveFormsModule,
    HttpClientModule,
    BrowserAnimationsModule,
    ToastrModule.forRoot({
      progressBar:true
    })
  ],
  providers: [
    PaymentDetailService,
    UserService,
    AuthGuard
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
