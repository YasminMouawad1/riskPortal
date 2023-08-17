import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Role } from '@pc-core/manager/role';
import { RequestStatus } from '@pc-share/enums/request-status.enum';

@Component({
  selector: 'app-request-card',
  templateUrl: './request-card.component.html',
  styleUrls: ['./request-card.component.scss'],
})
export class RequestCardComponent implements OnInit {
  @Input() itemData!: {
    cbNameAr?: string;
    cbNameEn?: string;
    crNumber?: string | number;
    crName?: string;
    requestId?: string;
    requestNumber?: string;
    date?: string;
    createdAt?: string;
    crCityAr?: string;
    crCityEn?: string;
    actualStars?: number;
    forceDowngrade?: boolean;
    status?: string;
  };
  @Input() selectable = false;
  @Input() isSelected = false;
  @Output() navigate = new EventEmitter<any>();
  @Output() changeSelect = new EventEmitter<any>();
  // ===============
  role = Role;
  requestStatus = RequestStatus;
  name!: any;
  labelId = 'RequestCard' + Math.random() * 100;
  constructor() { }

  ngOnInit(): void {
    this.name = this.itemData?.crName;
    this.itemData.actualStars = Number(this.itemData.actualStars)
  }
  onClickCard(): void {
    this.navigate.emit();
  }
  onChangeSelectCard(event: Event): void {
    this.changeSelect.emit(event);
  }
}
