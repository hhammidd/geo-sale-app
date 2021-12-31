import {Injectable, ViewChild} from '@angular/core';
import {SalePointsInfoTo} from "../model/SalePointsInfoTo";
import {ComuneDto} from "../model/ComuneDto";
import {SalePointTo} from "../model/SalePointTo";
import {HttpClient} from "@angular/common/http";
import {RegionsDto} from "../model/RegionsDto";
import {ProvinceDto} from "../model/ProvinceDto";
import {MatPaginator} from "@angular/material/paginator";
import { Observable, throwError } from 'rxjs';
import {MatTableDataSource} from "@angular/material/table";


@Injectable({
  providedIn: 'root'
})
export class SpmainService {

  salePointTos: SalePointTo[] = [];

  private usersUrl: string;
  private geoUrl: string;

  // @ViewChild(MatPaginator) paginator: MatPaginator;
  // dataSource =  new MatTableDataSource(this.salePointTos);

  constructor(private http: HttpClient) {
    // this.usersUrl = 'http://94.130.228.242:31430/';
    this.usersUrl = 'http://localhost:8085/';
    this.geoUrl = 'http://localhost:8089/';
  }

  // url_ = '/assets/data/regions.json';

  getRegions() {
    // return this.http.get<RegionsDto[]>(this.url_ );
    return this.http.get<RegionsDto[]>(this.geoUrl + '/region-config/names');
  }

  getProvinces() {
    // return this.http.get<RegionsDto[]>(this.url_ );
    return this.http.get<ProvinceDto[]>(this.geoUrl + '/province-config/names');
  }

  getComunes() {
    // return this.http.get<RegionsDto[]>(this.url_ );
    return this.http.get<ComuneDto[]>(this.geoUrl + '/comune-config/names');
  }
  dataSource1 : any = [];

  @ViewChild(MatPaginator) paginator: MatPaginator;
  // dataSource = new MatTableDataSource(this.salePointTos);
  salePointsOnGeo(formData: SalePointsInfoTo): Observable<SalePointsInfoTo> {
    console.log('form data filter : ', formData);
    console.log('URL : ', this.usersUrl + 'sale-point-geo/filter-sale-point-test');


    return this.http.post<SalePointsInfoTo>(this.usersUrl + 'sale-point-geo/filter-sale-point-test', formData);

  }
}
