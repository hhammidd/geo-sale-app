import { Injectable } from '@angular/core';
import {BehaviorSubject} from "rxjs";
import {GeosName} from "./model/GeosName";
import {HttpClient} from "@angular/common/http";
import {RegionsDto} from "../../sale-points/model/RegionsDto";
import {RegionTo} from "./model/RegionTo";

@Injectable({
  providedIn: 'root'
})
export class MapGeoService {

  private geoUrl: string;

  constructor(private http: HttpClient) {
    // this.geoUrl = 'http://localhost:8092/'; // local
    this.geoUrl = 'http://94.130.228.242:32737/';
  }

  private geoSource = new BehaviorSubject<GeosName[]>([]);
  currentMessage = this.geoSource.asObservable();

  private selectionSource = new BehaviorSubject<any>({});
  currentSelection = this.selectionSource.asObservable();

  private selectionLayerSource = new BehaviorSubject<any>({});
  currentSelectionLayer = this.selectionLayerSource.asObservable();

  private deletedGeoSource = new BehaviorSubject<string>('');
  currentDeletedGeo = this.deletedGeoSource.asObservable();

  changeMessage(geo: GeosName[]){
    this.geoSource.next(geo)
  }

  changeSelectionMessage(selection: []){
    this.selectionSource.next(selection)
  }

  changeDeletedGeoMessage(deletedGeo: string){
    this.deletedGeoSource.next(deletedGeo)
  }

  getRegions() {
    return this.http.get<RegionTo[]>(this.geoUrl + 'region-config');
  }

}
