import { Component, OnInit } from '@angular/core';
import {SpmainService} from "./shared/spmain.service";
import {SalepointOlService} from "../salepoint-ol/shared/salepoint-ol.service";

@Component({
  selector: 'app-sale-points',
  templateUrl: './sale-points.component.html',
  styleUrls: ['./sale-points.component.css']
})
export class SalePointsComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

}
