import {Component, Input, OnInit} from '@angular/core';
import * as Highcharts from 'highcharts';
import HC_exporting from 'highcharts/modules/exporting';
import {DashboardService} from "../../dashboard.service";
import {map} from "rxjs/operators";
import {PieChartTo} from "../../../../sale-points/model/PieChartTo";
import {log2} from "ol/math";

@Component({
  selector: 'app-widget-pie',
  templateUrl: './pie.component.html',
  styleUrls: ['./pie.component.css']
})
export class PieComponent implements OnInit {

  Highcharts = Highcharts;
  chartOptions = {};

  @Input() data : any[] = [];

  constructor(private dashboardService: DashboardService) {

  }

  ngOnInit() {
    this.dashboardService.getDummy().subscribe(
      res => {
        this.data = res as PieChartTo[]
      }
    )
    console.log("bla", this.data)
        this.chartOptions = {
          chart: {
            plotBackgroundColor: null,
            plotBorderWidth: null,
            plotShadow: false,
            type: 'pie'
          },
          title: {
            text: 'Random'
          },
          tooltip: {
            pointFormat: '{series.name}: <b>{point.percentage:.1f}%</b>'
          },
          accessibility: {
            point: {
              valueSuffix: '%'
            }
          },
          plotOptions: {
            pie: {
              allowPointSelect: true,
              cursor: 'pointer',
              dataLabels: {
                enabled: true,
                format: '<b>{point.name}</b>: {point.percentage:.1f} %'
              }
            }
          },
          exporting: {
            enabled: true
          },
          credits: {
            enabled: false
          },
          events: {
            series: [{
              name: 'Brands',
              colorByPoint: true,
              data:  [{name: 'ss', y: 10}, {name: 'bb', y: 10}, {name: 'bb', y: 80}]
            }]
          },
        }
    ;


    HC_exporting(Highcharts);

    setTimeout(() => {
      window.dispatchEvent(
        new Event('resize')
      );
    }, 300);
  }

}
