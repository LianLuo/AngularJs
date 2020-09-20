import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { PaymentDetail } from 'src/app/models/payment-detail.model';
import { PaymentDetailService } from 'src/app/services/payment-detail.service';

@Component({
  selector: 'app-payment-detail-list',
  templateUrl: './payment-detail-list.component.html',
  styles: [
  ]
})
export class PaymentDetailListComponent implements OnInit {

  constructor(
    public service: PaymentDetailService,
    private toastr: ToastrService
  ) { }

  ngOnInit(): void {
    this.service.refreshList();
  }

  onSelected(payment: PaymentDetail) {
    this.service.formData = Object.assign({}, payment); // clone new object.
  }

  onDeleted(id: number) {
    if (confirm("Are you sure to delete this record?")) {
      this.service.deletePaymentDetail(id).subscribe(res => {
        this.toastr.info("Deleted successful", "Payment Detail Register.");
        this.service.refreshList();
      });
    }
  }

}
