import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {GeosTo} from "../model/GeosTo";
import {SalePointsInfoTo} from "../../sale-points/model/SalePointsInfoTo";
import {SalePointTo} from "../../sale-points/model/SalePointTo";

@Injectable({
  providedIn: 'root'
})
export class SalepointOlService {

  private usersUrl: string;
  private geoUrl: string;

  constructor(private http: HttpClient) {
    this.usersUrl = 'http://localhost:8085/';
    this.geoUrl = 'http://localhost:8089/';
  }

  geosTo: GeosTo;
  salePointTos: SalePointTo[] = [];

  getGeos(geoList: Set<string>) {
    this.geosTo = new GeosTo(Array.from(geoList));
    return this.http.post<SalePointsInfoTo>(this.usersUrl + 'sale-point-geo/filter-with-map', this.geosTo)
      .subscribe( data => {
        console.log('data from backend: ' , data);
        this.salePointTos = data.salePointTos as SalePointTo[];
        console.log('data after map: ', this.salePointTos);
      });
    console.log('final object in service: ', this.geosTo);
  }
}
