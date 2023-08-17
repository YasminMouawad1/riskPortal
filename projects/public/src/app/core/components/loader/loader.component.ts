import { Component, OnInit } from '@angular/core'; 
import { LoaderService } from '../../services/loader/loader.service';

@Component({
  selector: 'app-loading',
  templateUrl: './loader.component.html',
  styleUrls: ['./loader.component.scss'],
})
export class LoaderComponent implements OnInit {
  loading = false;
  // progressIndicators: number = 0;
  text: any = 'Loading...';
  constructor(private _loaderService: LoaderService) {
    this._loaderService.isLoading.subscribe((status) => {
      this.loading = status ;
    });
    this._loaderService.progressIndicators.subscribe((v) => {
      // this.text= v +'%';
    });
  }

  ngOnInit() {}
}
