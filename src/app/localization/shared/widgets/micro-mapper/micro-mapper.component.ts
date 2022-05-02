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

  countries: Country[] = [
    {value: '1', viewValue: 'Netherlands'},
    {value: '2', viewValue: 'Italy'},
    {value: '3', viewValue: 'Belgium'},
  ];

  deselectAll(s: string) {
    console.log('deselect All call: ')
    this.mapGeoService.changeDeselectAllSource(s)
  }

  changeSelectedCountry(selectedCountry: string) {
    console.log('change country: ', selectedCountry)
    this.selectedCountry = selectedCountry;
    this.mapGeoService.changeSelectedCountrySource(selectedCountry)

  }
}
