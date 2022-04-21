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
    {no: 1, brand: 'Hydrogen', amount: 1.0079, symbol: 'H'},
    {no: 2, brand: 'Helium', amount: 4.0026, symbol: 'He'},
    {no: 3, brand: 'Lithium', amount: 6.941, symbol: 'Li'},
    {no: 4, brand: 'Beryllium', amount: 9.0122, symbol: 'Be'},
    {no: 5, brand: 'Boron', amount: 10.811, symbol: 'B'},
    {no: 6, brand: 'Carbon', amount: 12.0107, symbol: 'C'},
    {no: 7, brand: 'Nitrogen', amount: 14.0067, symbol: 'N'},
    {no: 8, brand: 'Oxygen', amount: 15.9994, symbol: 'O'},
    {no: 9, brand: 'Fluorine', amount: 18.9984, symbol: 'F'},
    {no: 10, brand: 'Neon', amount: 20.1797, symbol: 'Ne'},
    {no: 11, brand: 'Neon', amount: 20.1797, symbol: 'Ne'},
    {no: 12, brand: 'Neon', amount: 20.1797, symbol: 'Ne'},
  ];
  displayedColumns: string[] = ['no', 'brand', 'amount', 'symbol'];

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
