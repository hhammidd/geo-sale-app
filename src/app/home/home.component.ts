import {Component, OnInit} from '@angular/core';
import {Chart, registerables} from 'chart.js';
import {DashboardService} from "../dashboard/shared/dashboard.service";
import * as Highcharts from 'highcharts';
import {environment} from "../../environments/environment";

interface Year {
  value: number;
  viewValue: string;
}

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  years: Year[] = [
    {value: 2019, viewValue: '2019'},
    {value: 2020, viewValue: '2020'},
    {value: 2021, viewValue: '2021'},
    {value: 2022, viewValue: '2022'},
  ];
  selected = (new Date()).getFullYear();

  title = '';
  currentApplicationVersion = environment.appVersion;

  constructor(private dashboardService: DashboardService) {
    Chart.register(...registerables)
  }

  result: any;
  resultBar: any;
  chart1: any = [];
  chart2: any = [];
  chart3: any = [];
  chart4: any = [];
  chartForBlaNL: any = [];
  chartForBlaIT: any = [];
  names: any;
  ys: any;
  predictLevel1Mock: number[] = [0, 0, 0, 0, 100, 88, 155, 112 , 99, 150, 160, 170]
  predictLevel1MockNew: number[] = [30, 60, 70, 80, 100, 88, 155, 112 , 99, 150, 160, 170]
  predictLevel2Mock: number[] = [0, 0, 0, 0, 105, 99, 160, 122 , 100, 160, 170, 175]
  predictLevel2MockNew: number[] = [70, 60, 20, 30, 105, 99, 160, 122 , 100, 160, 170, 175]
  predictLevel3Mock: number[] = [0, 0, 0, 0, 105, 99, 160, 122 , 100, 160, 170, 175]
  predictLevel3MockNew: number[] = [80, 80, 80, 80, 110, 110, 167, 120 , 110, 166, 169, 179]
  dataBar: any;
  currentMonthBackgroundColors: any = [
    'rgba(255, 159, 64, 0.2)',
    'rgba(255, 159, 64, 0.2)',
    'rgba(255, 159, 64, 0.2)',
    'rgba(255, 159, 64, 0.2)',
    'rgba(255, 159, 64, 0.2)',
    'rgba(255, 159, 64, 0.2)',
    'rgba(255, 159, 64, 0.2)',
    'rgba(255, 159, 64, 0.2)',
    'rgba(255, 159, 64, 0.2)',
    'rgba(255, 159, 64, 0.2)',
    'rgba(255, 159, 64, 0.2)',
    'rgba(255, 159, 64, 0.2)',
  ];

  boarderColors: any = [
    'rgb(255, 159, 64)',
    'rgb(255, 159, 64)',
    'rgb(255, 159, 64)',
    'rgb(255, 159, 64)',
    'rgb(255, 159, 64)',
    'rgb(255, 159, 64)',
    'rgb(255, 159, 64)',
    'rgb(255, 159, 64)',
    'rgb(255, 159, 64)',
    'rgb(255, 159, 64)',
    'rgb(255, 159, 64)',
    'rgb(255, 159, 64)',
  ]

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
    this.createCountriesLineChart();
    this.CreateFirstLeftChart();
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

    const chart1 = Highcharts.chart('chart-column1' as any, {
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

  private createCountriesLineChart() {
    this.dashboardService.getCountryBarCharts().then(res2 => {
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

  private CreateFirstLeftChart() {
    this.dashboardService.getDummyw(this.selected).then((res) => {
      this.result = res.chartValues;
      console.log(this.result)

      this.names = this.result.map(res =>
        res.name as string)

      this.ys = this.result.map(res =>
        res.y as number)

      this.chart1 = new Chart('canvas', {
        type: 'line',
        data: {
          labels: this.names,
          datasets: [{
            label: 'EV number',
            data: this.ys,
            borderWidth: 1,
            fill: false,
            backgroundColor: 'rgba(93, 175, 89,0.1 )',
            borderColor: '#3e95cd',
            order: 1
          },{
            label: 'predict level 1',
            data: this.predictLevel1Mock,
            borderWidth: 1,
            fill: false,
            backgroundColor: 'rgba(93, 175, 89,0.1 )',
            borderColor: '#873e23',
            order: 2
          },
            {
              label: 'predict level 2',
              data: this.predictLevel2Mock,
              borderWidth: 1,
              fill: false,
              backgroundColor: 'rgba(93, 175, 89,0.1 )',
              borderColor: '#063970',
              order: 3
            }, {
              label: 'predict level 3',
              data: this.predictLevel3Mock,
              borderWidth: 1,
              fill: false,
              backgroundColor: 'rgba(93, 175, 89,0.1 )',
              borderColor: '#76b5c5',
              order: 4
            },
            {
              label: 'current month',
              data: this.getCurrentMonthData(this.selected),
              type: 'bar',
              order: 5,
              backgroundColor: this.currentMonthBackgroundColors,
              borderColor: this.boarderColors,
              borderWidth: 1
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
          },{
            label: 'predict level 1',
            data: this.predictLevel1Mock,
            borderWidth: 1,
            fill: false,
            backgroundColor: 'rgba(93, 175, 89,0.1 )',
            borderColor: '#873e23',
            order: 1
          },
            {
              label: 'predict level 2',
              data: this.predictLevel2Mock,
              borderWidth: 1,
              fill: false,
              backgroundColor: 'rgba(93, 175, 89,0.1 )',
              borderColor: '#063970',
              order: 3
            }, {
              label: 'predict level 3',
              data: this.predictLevel2Mock,
              borderWidth: 1,
              fill: false,
              backgroundColor: 'rgba(93, 175, 89,0.1 )',
              borderColor: '#76b5c5',
              order: 4
            },
            {
              label: 'current month',
              data: this.getCurrentMonthData(this.selected),
              type: 'bar',
              order: 2,
              backgroundColor: this.currentMonthBackgroundColors,
              borderColor: this.boarderColors,
              borderWidth: 1
            }]
        }
      })

      this.chartForBlaNL = new Chart('canvasChartForBlaNL', {
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
          },
            {
              label: 'current month',
              data: this.getCurrentMonthData(this.selected),
              type: 'bar',
              order: 2,
              backgroundColor: this.currentMonthBackgroundColors,
              borderColor: this.boarderColors,
              borderWidth: 1
            },
            {
              label: 'predict level 1',
              data: this.predictLevel1Mock,
              borderWidth: 1,
              fill: false,
              backgroundColor: 'rgba(93, 175, 89,0.1 )',
              borderColor: '#873e23',
              order: 1
            },
            {
              label: 'predict level 2',
              data: this.predictLevel2Mock,
              borderWidth: 1,
              fill: false,
              backgroundColor: 'rgba(93, 175, 89,0.1 )',
              borderColor: '#063970',
              order: 3
            }, {
              label: 'predict level 3',
              data: this.predictLevel2Mock,
              borderWidth: 1,
              fill: false,
              backgroundColor: 'rgba(93, 175, 89,0.1 )',
              borderColor: '#76b5c5',
              order: 4
            }]
        }
      })

      this.chartForBlaIT = new Chart('canvasChartForBlaIT', {
        type: 'line',
        data: {
          labels: this.names,
          datasets: [{
            label: 'IT',
            data: this.ys, // a method get the data for IT
            borderWidth: 1,
            fill: false,
            backgroundColor: 'rgba(93, 175, 89,0.1 )',
            borderColor: '#3e95cd',
          },
            {
              label: 'current month',
              data: this.getCurrentMonthData(this.selected),
              type: 'bar',
              order: 2,
              backgroundColor: this.currentMonthBackgroundColors,
              borderColor: this.boarderColors,
              borderWidth: 1
            },
            {
              label: 'predict level 1',
              data: this.predictLevel1Mock,
              borderWidth: 1,
              fill: false,
              backgroundColor: 'rgba(93, 175, 89,0.1 )',
              borderColor: '#873e23',
              order: 1
            },
            {
              label: 'predict level 2',
              data: this.predictLevel2Mock,
              borderWidth: 1,
              fill: false,
              backgroundColor: 'rgba(93, 175, 89,0.1 )',
              borderColor: '#063970',
              order: 3
            }, {
              label: 'predict level 3',
              data: this.predictLevel2Mock,
              borderWidth: 1,
              fill: false,
              backgroundColor: 'rgba(93, 175, 89,0.1 )',
              borderColor: '#76b5c5',
              order: 4
            }]
        }
      })

      this.chart3 = new Chart('canvas3', {
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
          },
            {
              label: 'predict level 1',
              data: this.predictLevel1Mock,
              borderWidth: 1,
              fill: false,
              backgroundColor: 'rgba(93, 175, 89,0.1 )',
              borderColor: '#873e23',
              order: 1
            },
            {
              label: 'predict level 2',
              data: this.predictLevel2Mock,
              borderWidth: 1,
              fill: false,
              backgroundColor: 'rgba(93, 175, 89,0.1 )',
              borderColor: '#063970',
              order: 3
            }, {
              label: 'predict level 3',
              data: this.predictLevel2Mock,
              borderWidth: 1,
              fill: false,
              backgroundColor: 'rgba(93, 175, 89,0.1 )',
              borderColor: '#76b5c5',
              order: 4
            }]
        }
      })

      this.chart4 = new Chart('canvas4', {
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
          },{
            label: 'predict level 1',
            data: this.predictLevel1Mock,
            borderWidth: 1,
            fill: false,
            backgroundColor: 'rgba(93, 175, 89,0.1 )',
            borderColor: '#873e23',
            order: 1
          },
            {
              label: 'current month',
              data: this.getCurrentMonthData(this.selected),
              type: 'bar',
              order: 2,
              backgroundColor: this.currentMonthBackgroundColors,
              borderColor: this.boarderColors,
              borderWidth: 1
            },
            {
              label: 'predict level 2',
              data: this.predictLevel2Mock,
              borderWidth: 1,
              fill: false,
              backgroundColor: 'rgba(93, 175, 89,0.1 )',
              borderColor: '#063970',
              order: 3
            }, {
              label: 'predict level 3',
              data: this.predictLevel2Mock,
              borderWidth: 1,
              fill: false,
              backgroundColor: 'rgba(93, 175, 89,0.1 )',
              borderColor: '#76b5c5',
              order: 4
            }]
        }
      })

    })
  }

  /**
   * Get the current month and put a random 200 for hight to distinguish current month
   */
  getCurrentMonthData(yearSelected: any): number[] {
    const date = new Date();
    var array: number[] = [];

    if (yearSelected < date.getFullYear()) {
      for(var i=0; i<12; ++i) { i === date.getMonth() ? array.push(200) : array.push(0)}
    } else {
      for(var i=0; i<12; ++i) { array.push(0)}
    }

    return array as number[];
  }

  changeYearChart1(yearValue: number) {
    this.dashboardService.getDummyw(yearValue).then((res) => {
      this.result = res.chartValues;
      console.log(this.result)

      this.names = this.result.map(res =>
        res.name as string)

      this.ys = this.result.map(res =>
        res.y as number)


      this.chart1.data.datasets[0].data = this.ys; // EV number
      this.chart1.data.datasets[1].data = this.predictLevel1MockNew;
      this.chart1.data.datasets[2].data = this.predictLevel2MockNew;
      this.chart1.data.datasets[3].data = this.predictLevel3MockNew;
      this.chart1.data.datasets[4].data = this.getCurrentMonthData(yearValue);
      this.chart1.update();
    });
  }

  changeYearChart2(yearValue: number) {
    this.dashboardService.getDummyw(yearValue).then((res) => {
      this.result = res.chartValues;
      console.log(this.result)

      this.names = this.result.map(res =>
        res.name as string)

      this.ys = this.result.map(res =>
        res.y as number)

      this.chart2.data.datasets[0].data = this.ys; // EV number
      this.chart2.data.datasets[1].data = this.predictLevel1MockNew;
      this.chart2.data.datasets[2].data = this.predictLevel2MockNew;
      this.chart2.data.datasets[3].data = this.predictLevel3MockNew;
      this.chart2.data.datasets[4].data = this.getCurrentMonthData(yearValue);
      this.chart2.update();
    });
  }
}
