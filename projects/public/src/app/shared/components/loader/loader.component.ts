import { Component, OnInit } from '@angular/core';
import { LoaderService } from '../../../core/services/loader/loader.service';
// import { LoaderService } from '../../services/loader.service';
@Component({
  selector: 'app-loader',
  templateUrl: './loader.component.html',
  styleUrls: ['./loader.component.scss']
})
export class LoaderComponent {

  loading: boolean = true;

  constructor(private _loaderService: LoaderService) {

    this._loaderService.isLoading.subscribe((v) => {
      setTimeout(() => {
        this.loading = v;
      }, 1500);
    });
  }
}
