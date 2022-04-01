import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import {HousePriceTo} from "./model/HousePriceTo";
import {SalePointTo} from "../../sale-points/model/SalePointTo";

@Component({
  selector: 'app-houseinfo',
  templateUrl: './houseinfo.component.html',
  styleUrls: ['./houseinfo.component.css']
})



export class HouseinfoComponent implements OnInit {

  title = 'angular-material-tab-router';
  navLinks: any[];
  activeLinkIndex = -1;
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

  constructor(private router: Router) {
    this.navLinks = [
      {
        label: 'Tab1',
        link: '/tab1',
        index: 0
      }, {
        label: 'Tab2',
        link: '/tab2',
        index: 1
      }, {
        label: 'Tab3',
        link: '/tab3',
        index: 2
      },
    ];
  }
  ngOnInit(): void {
    this.router.events.subscribe((res) => {
      this.activeLinkIndex = this.navLinks.indexOf(this.navLinks.find(tab => tab.link === '.' + this.router.url));
    });
  }
}
