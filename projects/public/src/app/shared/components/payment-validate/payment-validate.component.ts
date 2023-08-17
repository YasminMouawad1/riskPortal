import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { paymentStatus } from '@pc-share/enums/payment-status.enum';
import { ClassificationRequestEndpoints } from '@pc-share/services/endpoints/classification-request.endpoint.service';

@Component({
  selector: 'app-payment-validate',
  templateUrl: './payment-validate.component.html',
  styleUrls: ['./payment-validate.component.scss'],
})

export class PaymentValidateComponent implements OnInit {
  invoiceId?: string;
  public paymentStatusEnum=paymentStatus
  paymentStatus?: {
    status: string;
  }; 
  constructor(
    private route: ActivatedRoute,
    private _classReqEndpoints: ClassificationRequestEndpoints
  ) {}

  ngOnInit(): void {
    this.route.params.subscribe((params) => {
      this.invoiceId = params['invoiceId'];
      if (this.invoiceId) {
        this._classReqEndpoints
          .getPaymentValidate(this.invoiceId)
          .subscribe((v) => {
            this.paymentStatus = v; 
          });
      }
    });
  }
}
