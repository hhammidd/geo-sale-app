import {Component, OnInit} from '@angular/core';
import {DashboardService} from "./shared/dashboard.service";
import {RegionsDto} from "../sale-points/model/RegionsDto";
import {EvInfoTo} from "../sale-points/model/EvInfoTo";
import {PieChartTo} from "../sale-points/model/PieChartTo";

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  bigChart: any = [];
  cards: number[] = [];
  pieChart: any[] = [];
  regions: RegionsDto[] = [];

  constructor(private dashboardService: DashboardService) {

  }

  evInfos: EvInfoTo[] = [];
  results: PieChartTo[] = [{name: "ss", y: 10}, {name: "bb", y: 10}, {name: "bb", y: 80}];

  ngOnInit(): void {
    this.bigChart = this.dashboardService.bigChart();
    this.cards = this.dashboardService.cards();
    this.dashboardService.getDummy()
      .subscribe(res => {
        this.pieChart = res as PieChartTo[];
      });
    console.log("sqwssqwsqwswqsswswssd ", this.bigChart)
    console.log("ssswswswssd ", this.evInfos)
    console.log("sssd ", this.pieChart)
  }

}
