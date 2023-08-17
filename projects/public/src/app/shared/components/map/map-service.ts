import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { environment } from "@pc-env/environment";
import { BehaviorSubject, Observable } from "rxjs";

@Injectable()
export class MapService {
    address:BehaviorSubject<{latitude : number , longitude:number}> = new BehaviorSubject<{latitude : number , longitude:number}>({latitude:0 , longitude:0});
    $address:Observable<{latitude : number , longitude:number}> = this.address.asObservable()
    constructor(private http:HttpClient){
    }
}