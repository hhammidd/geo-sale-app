import { Component, OnInit } from '@angular/core';
import {HousePriceTo} from "../../../../houseinfo/houseinfo/model/HousePriceTo";
import { GeosName } from '../../model/GeosName';

@Component({
  selector: 'filter-bar',
  templateUrl: './filter-bar.component.html',
  styleUrls: ['./filter-bar.component.css']
})
export class FilterBarComponent implements OnInit {

  title = 'angular-material-tab-router';

  dataSource: GeosName[] = [
    {no: 1, name: 'City1', other: 'bla'},
    {no: 2, name: 'City2', other: 'bla'},
    {no: 3, name: 'Milan', other: 'bla'},
    {no: 4, name: 'Milan', other: 'bla'},
    {no: 5, name: 'Milan', other: 'bla'},
    {no: 6, name: 'Milan', other: 'bla'},
    {no: 7, name: 'Milan', other: 'bla'},
    {no: 8, name: 'Milan', other: 'bla'},
    {no: 9, name: 'Milan', other: 'bla'},
    {no: 7, name: 'Milan', other: 'bla'},
    {no: 8, name: 'Milan', other: 'bla'},
    {no: 9, name: 'Milan', other: 'bla'},
  ];
  displayedColumns: string[] = ['no', 'name', 'other'];

  constructor() {
  }

  ngOnInit() {
    const headerRow = document.querySelector('mat-header-row');
    const matTable = document.querySelector('mat-table');
    const tableContainer = document.querySelector('.example-container');
    if (tableContainer && headerRow && matTable) {
      tableContainer.insertBefore(headerRow, matTable);
    }
  }

}
