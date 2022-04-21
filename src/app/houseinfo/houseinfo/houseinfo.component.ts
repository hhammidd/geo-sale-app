import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import {HousePriceTo} from "./model/HousePriceTo";

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
  displayedColumns: string[] = ['no', 'brand', 'inflation', 'symbol'];
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
