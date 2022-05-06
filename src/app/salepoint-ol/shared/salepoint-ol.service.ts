import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {GeosTo} from "../model/GeosTo";
import {SalePointsInfoTo} from "../../sale-points/model/SalePointsInfoTo";
import {SalePointTo} from "../../sale-points/model/SalePointTo";
import {BehaviorSubject} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class SalepointOlService {

  private usersUrl: string;
  private geoUrl: string;

  constructor(private http: HttpClient) {
    // this.usersUrl = 'http://localhost:8088/'; // local
    this.usersUrl = 'http://94.130.228.242:30183/'; // local
    // this.geoUrl = 'http://localhost:8092/'; // local
    this.geoUrl = 'http://94.130.228.242:32737/';
  }

  private salePointTosSource = new BehaviorSubject<SalePointTo[]>([]); // Later should accept countries
  currentSalePointTos = this.salePointTosSource.asObservable();

  changeSalePointTosSource(salePOints: SalePointTo[]) {
    this.salePointTosSource.next(salePOints)
  }

  geosTo: GeosTo;
  salePointTos: SalePointTo[] = [];

  getGeos(geoList: Set<string>) {
    this.geosTo = new GeosTo(Array.from(geoList));
    return this.http.post<SalePointsInfoTo>(this.usersUrl + 'sale-point-geo/filter-with-map', this.geosTo)
      .subscribe( data => {
        console.log('data from backend cc: ' , data);
        this.salePointTos = data.salePointTos as SalePointTo[];
        this.changeSalePointTosSource(data.salePointTos)
      });
    console.log('final object in service: ', this.geosTo);
  }
}
