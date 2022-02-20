import { Component, OnInit } from '@angular/core';
import {DashboardService} from "./shared/dashboard.service";
import {RegionsDto} from "../sale-points/model/RegionsDto";
import {EvInfoTo} from "../sale-points/model/EvInfoTo";

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  bigChart: any = [];
  cards: number[] = [];
  pieChart: any = [];
  regions: RegionsDto[] = [];
  constructor(private dashboardService: DashboardService) { }
  evInfos: EvInfoTo[];

  ngOnInit(): void {
    this.bigChart = this.dashboardService.bigChart();
    this.dashboardService.getEvInfos().subscribe(res => this.evInfos = res);
    this.cards = this.dashboardService.cards();
    this.pieChart = this.dashboardService.pieChart();
  }

}
