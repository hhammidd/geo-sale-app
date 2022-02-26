import {Component, OnInit} from '@angular/core';
import { Chart, registerables } from 'chart.js';
import {DashboardService} from "../dashboard/shared/dashboard.service";
import {PieChartTo} from "../sale-points/model/PieChartTo";
import {Chart1} from "../dashboard/shared/model/Chart1";

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  constructor(private dashboardService: DashboardService) {
    Chart.register(...registerables)
  }

  result: any;
  chart: any = [];
  names: any;
  ys: any;

  ngOnInit(): void {
    this.dashboardService.getDummyw().then((res) => {
      this.result = res;
      console.log(this.result)

      this.names = this.result.map (res =>
        res.name as string)

      this.ys = this.result.map (res =>
        res.y as number)

      this.chart = new Chart('canvas', {
        type: 'line',
        data: {
          labels: this.names,
          datasets: [{
            label: '# of Votes',
            data: this.ys,
            borderWidth: 1,
            fill: false,
            backgroundColor: 'rgba(93, 175, 89,0.1 )',
            borderColor: '#3e95cd',
          }]
        }
      })
    })
  }

}
