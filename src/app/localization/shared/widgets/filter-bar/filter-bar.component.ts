import {Component, Input, OnInit} from '@angular/core';
import { GeosName } from '../../model/GeosName';
import {MapGeoService} from "../../map-geo.service";
import {MainMapComponent} from "../main-map/main-map.component";
import {SalepointOlService} from "../../../../salepoint-ol/shared/salepoint-ol.service";

@Component({
  selector: 'filter-bar',
  templateUrl: './filter-bar.component.html',
  styleUrls: ['./filter-bar.component.css']
})
export class FilterBarComponent implements OnInit {

  title = 'angular-material-tab-router';
  // @Input() dataSourcebb: GeosName[];
  dataSourcebb: GeosName[];
  constructor(public service: SalepointOlService,
              public mapGeoService: MapGeoService) {
  }

  message: string;

  displayedColumns: string[] = ['no', 'name', 'other'];
  selectionLayer: any;
  selection: any = {}
  deletedGeo: string = ''

  ngOnInit() {
    this.mapGeoService.currentMessage.subscribe(message => {
        console.log('bla new message is from filetr: ', message)
        this.dataSourcebb = message
    })
    this.mapGeoService.currentSelection.subscribe(messageSelection => this.selection = messageSelection)
    this.mapGeoService.currentSelectionLayer.subscribe(messageSelectionLayerSource => this.selectionLayer = messageSelectionLayerSource)
    this.mapGeoService.currentDeletedGeo.subscribe(messageDeletedGeo => this.deletedGeo = messageDeletedGeo)
    const headerRow = document.querySelector('mat-header-row');
    const matTable = document.querySelector('mat-table');
    const tableContainer = document.querySelector('.example-container');
    if (tableContainer && headerRow && matTable) {
      tableContainer.insertBefore(headerRow, matTable);
    }
  // this.mapGeoService.selectedgeo$.subscribe((value) => {
  //   console.log('hello  ', value)
  //   this.dataSource = value
  // })
  }

  openDialog(delete1: string, element: string) {
    console.log('tried to delete name: ', element)
    this.deletedGeo = element
    this.mapGeoService.changeDeletedGeoMessage(element)
    // this.selection = [];
    // this.selectionLayer.changed();
    // let myCompOneObj = new MainMapComponent(this.service, this.mapGeoService);
    //
    // myCompOneObj.newMessage(element);
  }
}
