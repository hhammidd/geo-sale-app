import { Component, OnInit } from '@angular/core';
import {HousePriceTo} from "../../../../houseinfo/houseinfo/model/HousePriceTo";

@Component({
  selector: 'companies-no-ev',
  templateUrl: './companies-no-ev.component.html',
  styleUrls: ['./companies-no-ev.component.css']
})
export class CompaniesNoEvComponent implements OnInit {

  title = 'angular-material-tab-router';

  dataSource: HousePriceTo[] = [
    {month: "JAN", name: 'Hydrogen', inflation: 1.0079, symbol: 'H'},
    {month: "FEB", name: 'Helium', inflation: 4.0026, symbol: 'He'},
    {month: "MAR", name: 'Lithium', inflation: 6.941, symbol: 'Li'},
    {month: "APR", name: 'Beryllium', inflation: 9.0122, symbol: 'Be'},
    {month: "MAY", name: 'Boron', inflation: 10.811, symbol: 'B'},
    {month: "JUN", name: 'Carbon', inflation: 12.0107, symbol: 'C'},
    {month: "JUL", name: 'Nitrogen', inflation: 14.0067, symbol: 'N'},
    {month: "AUG", name: 'Oxygen', inflation: 15.9994, symbol: 'O'},
    {month: "SEP", name: 'Fluorine', inflation: 18.9984, symbol: 'F'},
    {month: "OCT", name: 'Neon', inflation: 20.1797, symbol: 'Ne'},
    {month: "NOV", name: 'Neon', inflation: 20.1797, symbol: 'Ne'},
    {month: "DEC", name: 'Neon', inflation: 20.1797, symbol: 'Ne'},
  ];
  displayedColumns: string[] = ['month', 'name', 'inflation', 'symbol'];

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
