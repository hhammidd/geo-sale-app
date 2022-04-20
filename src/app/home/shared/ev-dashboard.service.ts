import { Injectable } from '@angular/core';
import {YearChartValues} from "./widgets/model/YearChartValues";
import {HttpClient, HttpErrorResponse} from "@angular/common/http";
import {CountriesBarTo} from "../../sale-points/model/CountriesBarTo";

@Injectable({
  providedIn: 'root'
})
export class EvDashboardService {

  private url: string;
  private geoUrl: string;

  constructor(private http: HttpClient) {
    // this.url = 'http://localhost:8089/'; //local
    // this.geoUrl = 'http://localhost:8092/'; // local
    this.url = 'http://94.130.228.242:30183/';
    this.geoUrl = 'http://94.130.228.242:32737/';
    // this.url = 'http://localhost:8088/';
  }

  getEvsBarChart(value: number) {
    return this.http.get(this.url + `sale-point-geo/countries-map/${value}`) // change the year to variable
      .toPromise().then((data) => {
        return data as YearChartValues
      })
  }

  getCountryBarCharts() {
    console.log("jjj")
    return this.http.get(this.url + 'sale-point-geo/countries-map').toPromise()
      .then((data) => {
        console.log("hello", data)
        return data as CountriesBarTo
      })
  }

}
