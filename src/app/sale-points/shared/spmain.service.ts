import {Injectable, ViewChild} from '@angular/core';
import {SalePointsInfoTo} from "../model/SalePointsInfoTo";
import {ComuneDto} from "../model/ComuneDto";
import {SalePointTo} from "../model/SalePointTo";
import {HttpClient} from "@angular/common/http";
import {RegionsDto} from "../model/RegionsDto";
import {ProvinceDto} from "../model/ProvinceDto";
import {MatPaginator} from "@angular/material/paginator";
import {Observable, throwError} from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class SpmainService {

  salePointTos: SalePointTo[] = [];

  private usersUrl: string;
  private geoUrl: string;


  constructor(private http: HttpClient) {
    // this.usersUrl = 'http://192.168.58.2:31430/';
    // this.usersUrl = 'http://localhost:8085/'; // local
    // this.usersUrl = 'http://192.168.58.2:30183'; // local
    this.usersUrl = 'http://10.104.235.224:8089'; // local
    // this.geoUrl = 'http://localhost:8092'; // local
    // this.geoUrl = 'http://192.168.58.2:32737'; // minikube ip
    this.geoUrl = 'http://10.109.168.76:8092'; // minikube ip
  }

  getRegions() {
    return this.http.get<RegionsDto[]>(this.geoUrl + '/region-config/names');
  }

  getProvinces() {
    return this.http.get<ProvinceDto[]>(this.geoUrl + '/province-config/names');
  }

  getComunes() {
    // return this.http.get<RegionsDto[]>(this.url_ );
    return this.http.get<ComuneDto[]>(this.geoUrl + '/comune-config/names');
  }



  @ViewChild(MatPaginator) paginator: MatPaginator;

  salePointsOnGeo(formData: SalePointsInfoTo): Observable<SalePointsInfoTo> {
    console.log('form data filter : ', formData);
    console.log('URL : ', this.usersUrl + 'sale-point-geo/filter-sale-point-test');


    return this.http.post<SalePointsInfoTo>(this.usersUrl + 'sale-point-geo/filter-sale-point-test', formData);

  }
}
