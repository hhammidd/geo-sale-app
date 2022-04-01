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
    // this.usersUrl = 'http://localhost:8089/'; // local
    // this.usersUrl = 'http://192.168.58.2:30183/'; // local
    this.usersUrl = '192.168.58.2:30183/'; // local
    // this.usersUrl = 'http://10.104.235.224:8089/'; // local
    // this.geoUrl = 'http://localhost:8092/'; // local
    // this.geoUrl = 'http://192.168.58.2:32737/';
    this.geoUrl = '192.168.58.2:32737/';
    // this.geoUrl = 'http://10.109.168.76:8092/';
  }

  geosTo: GeosTo;
  salePointTos: SalePointTo[] = [];

  getGeos(geoList: Set<string>) {
    this.geosTo = new GeosTo(Array.from(geoList));
    return this.http.post<SalePointsInfoTo>(this.usersUrl + 'sale-point-geo/filter-with-map', this.geosTo)
      .subscribe( data => {
        console.log('data from backend: ' , data);
        this.salePointTos = data.salePointTos as SalePointTo[];
        // console.log('data after map: ', this.salePointTos);
      });
    console.log('final object in service: ', this.geosTo);
  }
}
