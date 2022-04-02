import {Component, OnInit, ViewChild} from '@angular/core';
import {MatDialog} from "@angular/material/dialog";
import {SpmainService} from "../shared/spmain.service";
import {FormGroup} from "@angular/forms";
import {SalePointTo} from "../model/SalePointTo";

import {MatPaginator} from "@angular/material/paginator";

@Component({
  selector: 'app-geo-sales',
  templateUrl: './geo-sales.component.html',
  styleUrls: ['./geo-sales.component.css']
})
export class GeoSalesComponent implements OnInit {


  constructor(public service: SpmainService, private dialog: MatDialog) {
  }

  fields = [
    {id: 1, value: 'Automation'},
    {id: 2, value: 'Electrical vehicles'},
    {id: 3, value: 'Farmacy'}];

  get f() {
    return this.formGroup.controls;
  }

  public formGroup: FormGroup;

  displayedColumns: string[] = ['name', 'province', 'comune', 'cap', 'tel', 'fieldCode'];

  @ViewChild(MatPaginator) paginator: MatPaginator;
  dataSource: SalePointTo[];

  ngOnInit() {
    console.log('Get datasource: ', this.service.salePointTos)
    this.service.salePointTos = this.dataSource;

  }

}
