import { HttpClient } from '@angular/common/http';
import {
  AfterViewInit,
  Attribute,
  Component,
  EventEmitter,
  Input,
  Output,
} from '@angular/core';
import { environment } from '@pc-env/environment';
import { SharedEndpoints } from '@pc-share/services/endpoints/shared.endpoint.service';
import { MapService } from './map-service';

@Component({
  selector: 'app-map',
  templateUrl: './map-component.html',
})
export class MapComponent implements AfterViewInit {
  @Input() latitude!: number;
  @Input() longitude!: number;
  @Input() height!: number;
  @Input() needAdress: boolean = false;

  @Output() changedLocation = new EventEmitter<any>();

  map!: google.maps.Map;
  address!: string;
  edited: boolean = false;
  marker!: google.maps.Marker;
  constructor(private _sharedEndPoints: SharedEndpoints) { }
  ngAfterViewInit(): void {
    this.initMap();
    // setTimeout(() => {
    //   this.initMap();
    // }, 1000);
  }

  // Initialize and add the map
  initMap(): void {
    // The location of coordinates
    const coordinates = { lat: +this.latitude, lng: +this.longitude };
    // The map, centered at coordinates
    this.map = new google.maps.Map(
      document.getElementById('map') as HTMLElement,
      {
        zoom: 12,
        center: coordinates,
      }
    );

    if (this.needAdress) {
      this.getAddress(coordinates.lat, coordinates.lng);
    }

    this.map.addListener('click', (e) => {
      let latitude = e.latLng.lat(),
        longitude = e.latLng.lng();
      if (this.marker) {
        this.marker.setMap(null);
      }
      this.edited = true;
      this.marker = new google.maps.Marker({
        position: { lat: latitude, lng: longitude },
        map: this.map,
      });
      if (this.needAdress) {
        this.getAddress(e.latLng.lat(), e.latLng.lng());
      } else {
        this.changedLocation.emit({
          latitude: e.latLng.lat(),
          longitude: e.latLng.lng(),
        });
      }
    });

    // The marker, positioned at coordinates
    this.marker = new google.maps.Marker({
      position: coordinates,
      map: this.map,
    });
  }
  getAddress(latitude: number, longitude: number) {

    if (latitude && longitude) {
      this._sharedEndPoints.getLocation(latitude, longitude).subscribe((data => { 
        this.changedLocation.emit({
          latitude,
          longitude,
          addressAr: data['resultAr']['results'][5]['formatted_address'],
          addressEn: data['resultEn']['results'][5]['formatted_address'],
        });
      }))
    }

  }

  restart() {
    this.edited = false;
    if (this.marker) {
      this.marker.setMap(null);
    }
    this.marker = new google.maps.Marker({
      position: { lat: this.latitude, lng: this.longitude },
      map: this.map,
    });
  }
}
