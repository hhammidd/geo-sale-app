import {Injectable} from '@angular/core';
import {HttpClient, HttpErrorResponse} from "@angular/common/http";
import {EvInfoTo} from "../../sale-points/model/EvInfoTo";
import {throwError} from "rxjs";
import { map } from "rxjs/operators"
import {PieChartTo} from "../../sale-points/model/PieChartTo";
import {Chart1} from "./model/Chart1";

@Injectable({
  providedIn: 'root'
})
export class DashboardService {

  private url: string;
  private geoUrl: string;
  private dummyUrl: string;
  private dummyUrl1: string;

  constructor(private http: HttpClient) {
    // this.url = 'http://localhost:8089/'; //local
    // this.geoUrl = 'http://localhost:8092/'; // local
    // this.url = 'http://192.168.58.2:30183/';
    this.url = 'http://192.168.58.2:8089/';
    // this.url = 'http://10.104.235.224:8089/';
    // this.geoUrl = 'http://192.168.58.2:32737/';
    this.geoUrl = 'http://192.168.58.2:8092/';
    // this.geoUrl = 'http://10.109.168.76:8092/';
    this.dummyUrl = 'http://localhost:3000/';
    this.dummyUrl1 = 'http://localhost:3001/';
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
  // pieChart: any[] = [{name: 'ss', y: 10}, {name: 'bb', y: 10}, {name: 'bb', y: 80}];
  pieChart: any[] = [];

  cards() {
    return [100, 100, 10, 10];
  }

  getDummy() {
    return this.http.get(this.dummyUrl + 'chartValues');
  }

  getDummyw() {
    // return this.http.get("https://samples.openweathermap.org/data/2.5/history/city?q=Warren,OH&appid=b6907d289e10d714a6e88b30761fae22")
    return this.http.get(this.dummyUrl1 + 'chartValues')
      .toPromise().then((data) => { return data})
  }

  getCountryBarCharts() {

    return this.http.get(this.dummyUrl + 'barValues')
      .toPromise().then((data) => { return data})
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

  // pieChart() {
  //   return this.http.get<EvInfoTo[]>(this.url + '/ev-infos');
  // }
  getPiChart() {
    return this.http.get<EvInfoTo[]>(this.url + '/ev-infos')

    // return this.http.get<EvInfoTo[]>(this.url + '/ev-infos');

    // return []
  }

}
