import {Component, Input, OnInit} from '@angular/core';
import {GeosName} from '../../model/GeosName';
import {MapGeoService} from "../../map-geo.service";
import {MainMapComponent} from "../main-map/main-map.component";
import {SalepointOlService} from "../../../../salepoint-ol/shared/salepoint-ol.service";
import {MatTableDataSource} from "@angular/material/table";

@Component({
  selector: 'filter-bar',
  templateUrl: './filter-bar.component.html',
  styleUrls: ['./filter-bar.component.css']
})
export class FilterBarComponent implements OnInit {

  title = 'angular-material-tab-router';
  dataSourcebb: GeosName[];
  listData: MatTableDataSource<any>;

  constructor(public service: SalepointOlService,
              public mapGeoService: MapGeoService) {
  }

  message: string;

  displayedColumns: string[] = ['name', 'other'];
  selectionLayer: any;
  selection: any = {}
  deletedGeo: string = ''
  searchKey: string;

  ngOnInit() {
    this.mapGeoService.currentMessage.subscribe(message => {
      this.dataSourcebb = message
      this.listData = new MatTableDataSource(message)
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
  }

  openDialog(delete1: string, element: string) {
    this.deletedGeo = element
    this.mapGeoService.changeDeletedGeoMessage(element)
  }

  onSearchClear() {
    this.searchKey = '';
    this.applyFilter()
  }

  applyFilter() {
    this.listData.filter = this.searchKey.trim().toLowerCase()
  }
}
