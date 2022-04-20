import { Component, OnInit } from '@angular/core';
import {EvDashboardService} from "../../ev-dashboard.service";
import {Chart, registerables} from "chart.js";
import {Year} from "../model/Year";

@Component({
  selector: 'ev-info-chart1',
  templateUrl: './ev-info-chart1.component.html',
  styleUrls: ['./ev-info-chart1.component.css']
})
export class EvInfoChart1Component implements OnInit {

  constructor(private evDashboardService: EvDashboardService) {
    Chart.register(...registerables)
  }

  // tODO make it common for all
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

  result: any;
  chart1: any = [];
  names: any;
  years: Year[] = [
    {value: 2019, viewValue: '2019'},
    {value: 2020, viewValue: '2020'},
    {value: 2021, viewValue: '2021'},
    {value: 2022, viewValue: '2022'},
  ];
  selected = (new Date()).getFullYear();
  ys: any;


  // TODO remove later
  predictLevel1Mock: number[] = [0, 0, 0, 0, 100, 88, 155, 112 , 99, 150, 160, 170]
  predictLevel1MockNew: number[] = [30, 60, 70, 80, 100, 88, 155, 112 , 99, 150, 160, 170]

  ngOnInit(): void {
    this.CreateRightBarChart();
  }

  private CreateRightBarChart() {
    this.evDashboardService.getEvsBarChart(this.selected).then((res) => {
      this.result = res.chartValues;
      console.log(this.result)

      this.names = this.result.map(res =>
        res.name as string)

      this.ys = this.result.map(res =>
        res.y as number)

      this.chart1 = new Chart('canvas1', {
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
              label: 'current month',
              data: this.getCurrentMonthData(this.selected),
              type: 'bar',
              order: 4,
              backgroundColor: this.currentMonthBackgroundColors,
              borderColor: this.boarderColors,
              borderWidth: 1
            }]
        }
      })
    })
  }

  /**
   * Get the current month and put a random 200 for hight to distinguish current month
   * TODO make it one for everyone
   */
  getCurrentMonthData(yearSelected: any): number[] {
    const date = new Date();
    var array: number[] = [];
    if (yearSelected == date.getFullYear()) {
      for(var i=0; i<12; ++i) { i === date.getMonth() ? array.push(200) : array.push(0)}
    } else {
      for(var i=0; i<12; ++i) { array.push(0)}
    }

    return array as number[];
  }


  changeYearChart1(yearValue: number) {
    this.evDashboardService.getEvsBarChart(yearValue).then((res) => {
      this.result = res.chartValues;
      console.log(this.result)

      this.names = this.result.map(res =>
        res.name as string)

      this.ys = this.result.map(res =>
        res.y as number)


      this.chart1.data.datasets[0].data = this.ys; // EV number
      this.chart1.data.datasets[1].data = this.predictLevel1MockNew;
      this.chart1.data.datasets[2].data = this.getCurrentMonthData(yearValue);
      this.chart1.update();
    });
  }
}
