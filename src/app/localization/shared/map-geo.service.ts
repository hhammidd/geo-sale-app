import { Injectable } from '@angular/core';
import {BehaviorSubject} from "rxjs";
import {GeosName} from "./model/GeosName";

@Injectable({
  providedIn: 'root'
})
export class MapGeoService {
  private geoSource = new BehaviorSubject<GeosName[]>([]);
  currentMessage = this.geoSource.asObservable();
  // private geoSource = new BehaviorSubject<Set<string>>([]);
  // currentMessage = this.geoSource.asObservable();
  // private geoSource = new BehaviorSubject<string>("default message");
  // currentMessage = this.geoSource.asObservable();

  // selectedgeo$ = this.geos$.asObservable();
  private selectionSource = new BehaviorSubject<any>({});
  currentSelection = this.selectionSource.asObservable();

  private selectionLayerSource = new BehaviorSubject<any>({});
  currentSelectionLayer = this.selectionLayerSource.asObservable();

  private deletedGeoSource = new BehaviorSubject<string>('');
  currentDeletedGeo = this.deletedGeoSource.asObservable();
  constructor() { }

  changeMessage(geo: GeosName[]){
    this.geoSource.next(geo)
  }

  changeSelectionMessage(selection: []){
    this.selectionSource.next(selection)
  }

  changeDeletedGeoMessage(deletedGeo: string){
    this.deletedGeoSource.next(deletedGeo)
  }
  // changeMessage(geo: Set<string>){
  //   this.geoSource.next(geo)
  // }
  // setGeos(geo: GeosName[]) {
  //   this.geos$.next(geo);
  // }
}
