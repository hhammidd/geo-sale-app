import { Component, OnInit } from '@angular/core';
import {DashboardService} from "../../../../dashboard/shared/dashboard.service";
import {Chart, registerables} from "chart.js";
import * as Highcharts from 'highcharts';
import {EvDashboardService} from "../../ev-dashboard.service";

@Component({
  selector: 'ev-all-summary',
  templateUrl: './ev-all-summary.component.html',
  styleUrls: ['./ev-all-summary.component.css']
})
export class EvAllSummaryComponent implements OnInit {

  constructor(private evDashboardService: EvDashboardService) {
  }

  Highcharts = Highcharts;
  chartOptions: {};
  resultBar: any;

  ngOnInit(): void {
    this.createCountriesLineChart();
  }

  private createCountriesLineChart() {
    this.evDashboardService.getCountryBarCharts().then(res2 => {
      this.resultBar = res2.barValues;
      console.log("nn", this.resultBar);

      this.chartOptions =
        {
          chart: {
            type: 'column'
          },
          title: {
            text: 'Monthly Average EV basket size'
          },
          subtitle: {
            text: 'Source: WorldClimate.com'
          },
          xAxis: {
            categories: [
              'Jan',
              'Feb',
              'Mar',
              'Apr',
              'May',
              'Jun',
              'Jul',
              'Aug',
              'Sep',
              'Oct',
              'Nov',
              'Dec'
            ],
            crosshair: true
          },
          yAxis: {
            min: 0,
            title: {
              text: 'Rainfall (mm)'
            }
          },
          tooltip: {
            headerFormat: '<span style="font-size:10px">{point.key}</span><table>',
            pointFormat: '<tr><td style="color:{series.color};padding:0">{series.name}: </td>' +
              '<td style="padding:0"><b>{point.y:.1f} mm</b></td></tr>',
            footerFormat: '</table>',
            shared: true,
            useHTML: true
          },
          plotOptions: {
            column: {
              pointPadding: 0.2,
              borderWidth: 0
            }
          },
          series: this.resultBar
        }
    })
  }

}
