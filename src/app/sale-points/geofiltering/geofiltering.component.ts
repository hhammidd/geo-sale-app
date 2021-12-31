import {Component, OnInit, ViewChild} from '@angular/core';
import {SpmainService} from "../shared/spmain.service";
import {MatDialog, MatDialogConfig} from "@angular/material/dialog";
import {RegionsDto} from "../model/RegionsDto";
import {IDropdownSettings} from "ng-multiselect-dropdown";
import {ProvinceDto} from "../model/ProvinceDto";
import {ComuneDto} from "../model/ComuneDto";
import {FormControl, FormGroup} from "@angular/forms";
import {MatPaginator} from "@angular/material/paginator";
import {SalePointTo} from "../model/SalePointTo";
import {MatTableDataSource} from "@angular/material/table";

const ELEMENT_DATA: SalePointTo[] = [
  {id: 1, fieldCode: 'kit kat', name: 'NL', geoId : 1, cap : 'aqq', comune : 'sws', province : 'sw', country : 'sw', tel :'s', psw : 'sw', username: 's', coords: 'ss'},
  {id: 1, fieldCode: 'kit kat', name: 'NL', geoId : 1, cap : 'aqq', comune : 'sws', province : 'sw', country : 'sw', tel :'s', psw : 'sw', username: 's', coords: 'ss'},
  {id: 1, fieldCode: 'kit kat', name: 'NL', geoId : 1, cap : 'aqq', comune : 'sws', province : 'sw', country : 'sw', tel :'s', psw : 'sw', username: 's', coords: 'ss'},
  {id: 1, fieldCode: 'kit kat', name: 'NL', geoId : 1, cap : 'aqq', comune : 'sws', province : 'sw', country : 'sw', tel :'s', psw : 'sw', username: 's', coords: 'ss'},
  {id: 1, fieldCode: 'kit kat', name: 'NL', geoId : 1, cap : 'aqq', comune : 'sws', province : 'sw', country : 'sw', tel :'s', psw : 'sw', username: 's', coords: 'ss'},
  {id: 1, fieldCode: 'kit kat', name: 'NL', geoId : 1, cap : 'aqq', comune : 'sws', province : 'sw', country : 'sw', tel :'s', psw : 'sw', username: 's', coords: 'ss'},
  {id: 1, fieldCode: 'kit kat', name: 'NL', geoId : 1, cap : 'aqq', comune : 'sws', province : 'sw', country : 'sw', tel :'s', psw : 'sw', username: 's', coords: 'ss'},
  {id: 1, fieldCode: 'kit kat', name: 'NL', geoId : 1, cap : 'aqq', comune : 'sws', province : 'sw', country : 'sw', tel :'s', psw : 'sw', username: 's', coords: 'ss'},
  {id: 1, fieldCode: 'kit kat', name: 'NL', geoId : 1, cap : 'aqq', comune : 'sws', province : 'sw', country : 'sw', tel :'s', psw : 'sw', username: 's', coords: 'ss'},
  {id: 1, fieldCode: 'kit kat', name: 'NL', geoId : 1, cap : 'aqq', comune : 'sws', province : 'sw', country : 'sw', tel :'s', psw : 'sw', username: 's', coords: 'ss'},
  {id: 1, fieldCode: 'kit kat', name: 'NL', geoId : 1, cap : 'aqq', comune : 'sws', province : 'sw', country : 'sw', tel :'s', psw : 'sw', username: 's', coords: 'ss'},
  {id: 1, fieldCode: 'kit kat', name: 'NL', geoId : 1, cap : 'aqq', comune : 'sws', province : 'sw', country : 'sw', tel :'s', psw : 'sw', username: 's', coords: 'ss'},

];

@Component({
  selector: 'app-geofiltering',
  templateUrl: './geofiltering.component.html',
  styleUrls: ['./geofiltering.component.css']
})
export class GeofilteringComponent implements OnInit {

  @ViewChild('multiSelect') multiSelect;

  constructor(private service: SpmainService, private dialog: MatDialog) {
  }

  fields = [ //TODO connect db
    { id: 1, value: 'Automation'},
    { id: 2, value: 'Electrical vehicles'},
    { id: 3, value: 'Farmacy'}];

  markets = [ //TODO
    { id: 1, value: 'ITALY'},
    { id: 2, value: 'NETHERLANDS'},
    { id: 3, value: 'BELGIUM'}];

  regionDropdownList: RegionsDto[] = [];
  regionSelectedItems = [];
  regionDropdownSettings: IDropdownSettings;

  provinceDropdownList: ProvinceDto[] = [];
  provinceSelectedItems = [];
  provinceDropdownSettings: IDropdownSettings;

  comuneDropdownList: ComuneDto[] = [];
  comuneSelectedItems = [];
  comuneDropdownSettings: IDropdownSettings;

  field: string = "";
  market: string = "";

  public formGroup: FormGroup;
  public loadContent = false;

  // salePointsInfoTo: SalePointsInfoTo;
  @ViewChild(MatPaginator) paginator: MatPaginator;
  salePointTos: SalePointTo[] = [];
  dataSource = new MatTableDataSource(this.salePointTos);


  ngOnInit() {
    setTimeout(() => this.dataSource.paginator = this.paginator);
    this.service.getRegions().subscribe(res => this.regionDropdownList = res);
    this.service.getProvinces().subscribe(res => this.provinceDropdownList = res);
    this.service.getComunes().subscribe(res => this.comuneDropdownList = res);
    this.regionSelectedItems = [];
    this.regionDropdownSettings = {
      singleSelection: false,
      idField: 'regionId',
      textField: 'regionName',
      enableCheckAll: true,
      selectAllText: 'Select All',
      unSelectAllText: 'UnSelect All',
      limitSelection: -1,
      clearSearchFilter: true,
      searchPlaceholderText: 'search cities',
      itemsShowLimit: 3,
      allowSearchFilter: true,
      closeDropDownOnSelection: false,
      showSelectedItemsAtTop: false,
      defaultOpen: false,
    };

    this.provinceDropdownSettings = {
      singleSelection: false,
      idField: 'provinceId',
      textField: 'provinceName',
      enableCheckAll: true,
      selectAllText: 'Select All',
      unSelectAllText: 'UnSelect All',
      limitSelection: -1,
      clearSearchFilter: true,
      searchPlaceholderText: 'search cities',
      itemsShowLimit: 3,
      allowSearchFilter: true,
      closeDropDownOnSelection: false,
      showSelectedItemsAtTop: false,
      defaultOpen: false,
    };

    this.comuneDropdownSettings = {
      singleSelection: false,
      idField: 'comuneId',
      textField: 'comuneName',
      enableCheckAll: true,
      selectAllText: 'Select All',
      unSelectAllText: 'UnSelect All',
      limitSelection: -1,
      clearSearchFilter: true,
      searchPlaceholderText: 'search cities',
      itemsShowLimit: 3,
      allowSearchFilter: true,
      closeDropDownOnSelection: false,
      showSelectedItemsAtTop: false,
      defaultOpen: false,
    };
    this.setForm();
  }

  public setForm() {
    this.formGroup = new FormGroup({
      id: new FormControl(1),
      regions: new FormControl(this.regionDropdownList),
      provinces: new FormControl(this.provinceDropdownList),
      comunes: new FormControl(this.comuneDropdownList),
      market: new FormControl(this.market), // Todo fill later
      field: new FormControl(this.field), // Todo fill later
    });
    this.loadContent = true;
  }


  get f() {
    return this.formGroup.controls;
  }
  displayedColumns: string[] = ['name', 'province', 'comune', 'cap', 'tel', 'fieldCode'];



  public save() {
    if (this.formGroup.invalid) {
      this.formGroup.markAllAsTouched();
      return;
    }

    console.log(this.formGroup.value);
    this.service.salePointsOnGeo(this.formGroup.value)
      .subscribe( data => {
        console.log('data from backend: ' , data);
        this.salePointTos = data.salePointTos as SalePointTo[];
        this.dataSource = new MatTableDataSource(this.salePointTos);
        setTimeout(() => this.dataSource.paginator = this.paginator);
        console.log('data after map: ', this.salePointTos);
        console.log('data for datasource: ', this.dataSource);
      });
  }

  public resetForm() {
    // beacuse i need select all crickter by default when i click on reset button.
    this.setForm();
    this.multiSelect.toggleSelectAll();
    // i try below variable isAllItemsSelected reference from your  repository but still not working
    // this.multiSelect.isAllItemsSelected = true;
  }

  onCreate() {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;
    dialogConfig.width = '60%';
    this.dialog.open(GeofilteringComponent, dialogConfig);
  }

  public onFilterChange(item: any) {
    console.log(item);
  }

  public onDropDownClose(item: any) {
    console.log(item);
  }

  public onRegionSelect(regionj: any) {
    console.log(regionj);
  }

  public onProvinceSelect(provincej: any) {
    console.log(provincej);
  }

  public onComuneSelect(comunej: any) {
    console.log(comunej);
  }

  public onDeSelect(item: any) {
    console.log(item);
  }

  public onSelectAllRegion(regions: any) {
    console.log(regions);
  }

  public onSelectAllProvines(provinecs: any) {
    console.log(provinecs);
  }

  public onSelectAllComunes(comunes: any) {
    console.log(comunes);
  }

  public onDeSelectAll(items: any) {
    console.log(items);
  }
}
