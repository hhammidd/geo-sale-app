import {Component, Input, OnInit} from '@angular/core';
import { GeosName } from '../../model/GeosName';
import {MapGeoService} from "../../map-geo.service";

@Component({
  selector: 'filter-bar',
  templateUrl: './filter-bar.component.html',
  styleUrls: ['./filter-bar.component.css']
})
export class FilterBarComponent implements OnInit {

  title = 'angular-material-tab-router';
  // @Input() dataSourcebb: GeosName[];
  dataSourcebb: GeosName[];
  constructor(public mapGeoService: MapGeoService) {
  }

  message: string;

  displayedColumns: string[] = ['no', 'name', 'other'];


  ngOnInit() {
    this.mapGeoService.currentMessage.subscribe(message => {
        console.log('bla new message is from filetr: ', message)
        this.dataSourcebb = message
    })
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

  openDialog(delete1: string, element) {
    console.log('tried to delete')
  }
}
