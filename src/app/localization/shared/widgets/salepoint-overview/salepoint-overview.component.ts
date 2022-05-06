import { Component, OnInit } from '@angular/core';
import {MapGeoService} from "../../map-geo.service";
import {SalepointOlService} from "../../../../salepoint-ol/shared/salepoint-ol.service";
import {SalePointTo} from "../../../../sale-points/model/SalePointTo";
import {HousePriceTo} from "../../../../houseinfo/houseinfo/model/HousePriceTo";

@Component({
  selector: 'salepoint-overview',
  templateUrl: './salepoint-overview.component.html',
  styleUrls: ['./salepoint-overview.component.css']
})
export class SalepointOverviewComponent implements OnInit {

  dataSource: SalePointTo[] = []


  constructor(public salepointOlService: SalepointOlService) { }

  ngOnInit(): void {
    const headerRow = document.querySelector('mat-header-row');
    const matTable = document.querySelector('mat-table');
    const tableContainer = document.querySelector('.example-container');
    if (tableContainer && headerRow && matTable) {
      tableContainer.insertBefore(headerRow, matTable);
    }
    this.salepointOlService.currentSalePointTos.subscribe(messageSelectedCountrySource => this.dataSource = messageSelectedCountrySource)
  }

  displayedColumns: string[] = ['name', 'province', 'comune', 'cap', 'tel', 'fieldCode'];

}
