import {Component, Input, OnInit, ViewChild} from '@angular/core';
import {MatDialog, MatDialogConfig} from "@angular/material/dialog";
import {SpmainService} from "../shared/spmain.service";
import {RegionsDto} from "../model/RegionsDto";
import {IDropdownSettings} from "ng-multiselect-dropdown";
import {ProvinceDto} from "../model/ProvinceDto";
import {ComuneDto} from "../model/ComuneDto";
import {FormControl, FormGroup} from "@angular/forms";
import {SalePointsInfoTo} from "../model/SalePointsInfoTo";
import {SalePointTo} from "../model/SalePointTo";
import {GeofilteringComponent} from "../geofiltering/geofiltering.component";

import {MatPaginator} from "@angular/material/paginator";
import {MatTableDataSource} from "@angular/material/table";

@Component({
  selector: 'app-geo-sales',
  templateUrl: './geo-sales.component.html',
  styleUrls: ['./geo-sales.component.css']
})
export class GeoSalesComponent implements OnInit {


  constructor(public service: SpmainService, private dialog: MatDialog) {
  }

  fields = [
    { id: 1, value: 'Automation'},
    { id: 2, value: 'Electrical vehicles'},
    { id: 3, value: 'Farmacy'}];

  get f() {
    return this.formGroup.controls;
  }

  public formGroup: FormGroup;

  salePointsInfoTo: SalePointsInfoTo;


  displayedColumns: string[] = ['name', 'province', 'comune', 'cap', 'tel', 'fieldCode'];

  bigChart: any = [];
  @ViewChild(MatPaginator) paginator: MatPaginator;
  salePointTos: SalePointTo[] = [];
  // dataSource = new MatTableDataSource(this.salePointTos);
  dataSource : SalePointTo[];

  ngOnInit() {
    console.log('Get datasource: ' ,this.service.salePointTos)
    this.service.salePointTos = this.dataSource;

  }

}
