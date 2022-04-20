import {Injectable} from '@angular/core';
import {HttpClient, HttpErrorResponse} from "@angular/common/http";
import {EvInfoTo} from "../../sale-points/model/EvInfoTo";
import {throwError} from "rxjs";
import {map} from "rxjs/operators"
import {CountriesBarTo} from "../../sale-points/model/CountriesBarTo";
import {YearChartValues} from "../../home/shared/widgets/model/YearChartValues";

@Injectable({
  providedIn: 'root'
})
export class DashboardService {

  private url: string;
  private geoUrl: string;

  constructor(private http: HttpClient) {
    // this.url = 'http://localhost:8089/'; //local
    // this.geoUrl = 'http://localhost:8092/'; // local
    this.url = 'http://94.130.228.242:30183/';
    this.geoUrl = 'http://94.130.228.242:32737/';
    // this.url = 'http://localhost:8088/';
  }

  bigChart() {
    return [{
      name: 'Asia',
      data: [502, 635, 809, 947, 1402, 3634, 5268]
    }, {
      name: 'Africa',
      data: [106, 107, 111, 133, 221, 767, 1766]
    }, {
      name: 'Europe',
      data: [163, 203, 276, 408, 547, 729, 628]
    }, {
      name: 'America',
      data: [18, 31, 54, 156, 339, 818, 1201]
    }, {
      name: 'Oceania',
      data: [2, 2, 2, 6, 13, 30, 46]
    }];
  }

  evInfos: EvInfoTo[] = [];
  pieChart: any[] = [];

  cards() {
    return [100, 100, 10, 10];
  }

  getDummy() {
    return this.http.get(this.url + 'sale-point-geo/countries-map');
  }

  getDummyw(value: number) {
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

  errorHandler(error: HttpErrorResponse) {
    return throwError(error.message || "server error.");
  }

  getEvInfos() {
    console.log("ss")
    console.log("cc ", this.url + 'ev-infos')
    return this.http.get<EvInfoTo[]>(this.url + '/ev-infos')
      .pipe(map(res1 => res1.map(item => ({name: item.country, y: item.amount}))))
      .subscribe(res => {
        this.pieChart = res
      });
  }

  getPiChart() {
    return this.http.get<EvInfoTo[]>(this.url + '/ev-infos')
  }

}
