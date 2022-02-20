import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {ComuneDto} from "../../sale-points/model/ComuneDto";
import {EvInfoTo} from "../../sale-points/model/EvInfoTo";
import {RegionsDto} from "../../sale-points/model/RegionsDto";

@Injectable({
  providedIn: 'root'
})
export class DashboardService {

  private url: string;
  private geoUrl: string;

  constructor(private http: HttpClient) {
    this.url = 'http://localhost:8089/';
    this.geoUrl = 'http://localhost:8092/';
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


  cards() {
    this.getEvInfos();
    return [100, 100, 10, 10];
  }



  getEvInfos() {
    console.log("ss")
    console.log("cc ", this.url + 'ev-infos')
    return this.http.get<EvInfoTo[]>(this.url + '/ev-infos');
  }

  pieChart() {

    return [{
      name: 'Chrome',
      y: 61.41,
      sliced: true,
      selected: true
    }, {
      name: 'Internet Explorer',
      y: 11.84
    }, {
      name: 'Firefox',
      y: 10.85
    }, {
      name: 'Edge',
      y: 4.67
    }, {
      name: 'Safari',
      y: 4.18
    }, {
      name: 'Sogou Explorer',
      y: 1.64
    }, {
      name: 'Opera',
      y: 1.6
    }, {
      name: 'QQ',
      y: 1.2
    }, {
      name: 'Other',
      y: 2.61
    }]
  }
}
