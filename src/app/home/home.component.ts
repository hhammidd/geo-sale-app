import {Component, OnInit} from '@angular/core';
import { Chart, registerables } from 'chart.js';
import {DashboardService} from "../dashboard/shared/dashboard.service";
import {PieChartTo} from "../sale-points/model/PieChartTo";
import {Chart1} from "../dashboard/shared/model/Chart1";
import * as Highcharts from 'highcharts';
import {environment} from "../../environments/environment";
import {CountriesBarTo} from "../sale-points/model/CountriesBarTo";

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  title = 'Demo application for version numbering';
  currentApplicationVersion = environment.appVersion;

  constructor(private dashboardService: DashboardService) {
    Chart.register(...registerables)
  }

  result: any;
  resultBar: any;
  chart: any = [];
  chart2: any = [];
  names: any;
  ys: any;
  dataBar: any;

  public barChartOptions: any = {
    scaleShowVerticalLines: false,
    responsive: true,
    scales: {
      xAxes: [{
        stacked: true
      }],
      yAxes: [{
        stacked: true
      }]
    }
  };


  public barChartLabels: string[];
  public barChartType: string = 'bar';
  public barChartLegend: boolean = true;

  Highcharts = Highcharts;
  chartOptions: {};

  ngOnInit(): void {
    this.createChartColumn();
    this.dashboardService.getCountryBarCharts().then( res2 => {
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
            label: 'BE',
            data: this.ys,
            borderWidth: 1,
            fill: false,
            backgroundColor: 'rgba(93, 175, 89,0.1 )',
            borderColor: '#3e95cd',
          }]
        }
      })

      this.chart2 = new Chart('canvas2', {
        type: 'line',
        data: {
          labels: this.names,
          datasets: [{
            label: 'NL',
            data: this.ys,
            borderWidth: 1,
            fill: false,
            backgroundColor: 'rgba(93, 175, 89,0.1 )',
            borderColor: '#3e95cd',
          }]
        }
      })

      this.chart2 = new Chart('canvas3', {
        type: 'line',
        data: {
          labels: this.names,
          datasets: [{
            label: 'FR',
            data: this.ys,
            borderWidth: 1,
            fill: false,
            backgroundColor: 'rgba(93, 175, 89,0.1 )',
            borderColor: '#3e95cd',
          }]
        }
      })

      this.chart2 = new Chart('canvas4', {
        type: 'line',
        data: {
          labels: this.names,
          datasets: [{
            label: 'IT',
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

  private createChartColumn(): void {
      let date = new Date();
      const data: any[] = [];

    for (let i = 0; i < 10; i++) {
      date.setDate(new Date().getDate() + i);
      data.push({
        name: `${date.getDate()}/${date.getMonth() + 1}`,
        y: this.getRandomNumber(0, 1000),
      });
    }

    const chart = Highcharts.chart('chart-column' as any, {
      chart: {
        type: 'column',
      },
      title: {
        text: 'Column Chart',
      },
      credits: {
        enabled: false,
      },
      legend: {
        enabled: false,
      },
      yAxis: {
        min: 0,
        title: undefined,
      },
      xAxis: {
        type: 'category',
      },
      tooltip: {
        headerFormat: `<div>Date: {point.key}</div>`,
        pointFormat: `<div>{series.name}: {point.y}</div>`,
        shared: true,
        useHTML: true,
      },
      plotOptions: {
        bar: {
          dataLabels: {
            enabled: true,
          },
        },
      },
      series: [{
        name: 'Amount',
        data,
      }],
    } as any);

    setInterval(() => {
      date.setDate(date.getDate() + 1);
      chart.series[0].addPoint({
        name: `${date.getDate()}/${date.getMonth() + 1}`,
        y: this.getRandomNumber(0, 1000),
      }, true, true);
    }, 1500);
  }

  private getRandomNumber(min: number, max: number): number {
    return Math.floor(Math.random() * (max - min + 1) + min)
  }

}
