import { Component, ElementRef, Input, OnInit, ViewChild } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { environment } from '@pc-env/environment';
import { PaymentModel } from '@pc-share/models/payment.model';

@Component({
  selector: 'app-payment',
  templateUrl: './payment.component.html',
  styleUrls: ['./payment.component.scss'],
})
export class PaymentComponent implements OnInit {
  @Input('payment') payment!: PaymentModel;
  @ViewChild('paymentForm', { static: false }) paymentForm!: ElementRef;
  formActionURL!: string;
  constructor(private translateService: TranslateService) {}

  ngOnInit(): void {
    this.formActionURL = environment.paymentPageURL + this.translateService.currentLang;
  }

  ngAfterViewChecked() {
    if (this.payment) {
      this.paymentForm.nativeElement.submit();
    }
  }
}
