import { Component, OnInit } from '@angular/core';
import {MapGeoService} from "../../map-geo.service";

interface Country {
  value: string;
  viewValue: string;
}
@Component({
  selector: 'micro-mapper',
  templateUrl: './micro-mapper.component.html',
  styleUrls: ['./micro-mapper.component.css']
})
export class MicroMapperComponent implements OnInit {

  constructor(public mapGeoService: MapGeoService) { }

  selectedCountry: string = ''
  ngOnInit(): void {
    this.mapGeoService.currentSelectedCountry.subscribe(messageSelectedCountrySource => this.selectedCountry = messageSelectedCountrySource)
  }

  deselectAll(s: string) {
    this.mapGeoService.changeDeselectAllSource(s)
  }

  changeSelectedCountry(selectedCountry: string) {
    console.log('selected', selectedCountry)
    this.selectedCountry = selectedCountry;
    this.mapGeoService.changeSelectedCountrySource(selectedCountry)

  }
}
