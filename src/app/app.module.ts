import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {MaterialModule} from "./material/material.module";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {HttpClientModule} from "@angular/common/http";
import {AppRoutingModule} from "./app-routing.module";
import {LayoutModule} from "@angular/cdk/layout";
import {MatToolbarModule} from "@angular/material/toolbar";
import {MatButtonModule} from "@angular/material/button";
import {MatSidenavModule} from "@angular/material/sidenav";
import {MatIconModule} from "@angular/material/icon";
import {MatListModule} from "@angular/material/list";
import {MatGridListModule} from "@angular/material/grid-list";
import {MatCardModule} from "@angular/material/card";
import {MatMenuModule} from "@angular/material/menu";
import { NgMultiSelectDropDownModule } from 'ng-multiselect-dropdown';
import {NavComponent} from "./shared/nav/nav.component";
import { HomeComponent } from './home/home.component';
import { SalePointsComponent } from './sale-points/sale-points.component';
import {GeofilteringComponent} from "./sale-points/geofiltering/geofiltering.component";
import { GeoSalesComponent } from './sale-points/geo-sales/geo-sales.component';
import {SpmainService} from "./sale-points/shared/spmain.service";
import { SalepointOlComponent } from './salepoint-ol/salepoint-ol.component';
import {SalepointOlService} from "./salepoint-ol/shared/salepoint-ol.service";
import { DashboardComponent } from './dashboard/dashboard.component';
import { AreaComponent } from './dashboard/shared/widgets/area/area.component';
import { HighchartsChartModule } from 'highcharts-angular';
import {FlexLayoutModule} from "@angular/flex-layout";
import {CardComponent} from "./dashboard/shared/widgets/card/card.component";
import { PieComponent } from './dashboard/shared/widgets/pie/pie.component';
import {DashboardService} from "./dashboard/shared/dashboard.service";
import { Chart1Component } from './dashboard/shared/widgets/chart1/chart1.component';
import { HouseinfoComponent } from './houseinfo/houseinfo/houseinfo.component';
import {MatTabsModule} from "@angular/material/tabs";
import { Tab2Component } from './houseinfo/houseinfo/tab2/tab2.component';
import { Tab3Component } from './houseinfo/houseinfo/tab3/tab3.component';
import {Tab1Component} from "./houseinfo/houseinfo/tab1/tab1.component";
import { EvInfoChartComponent } from './home/shared/widgets/ev-info-chart/ev-info-chart.component';
import {EvDashboardService} from "./home/shared/ev-dashboard.service";
import { EvInfoChart1Component } from './home/shared/widgets/ev-info-chart1/ev-info-chart1.component';
import { EvAllSummaryComponent } from './home/shared/widgets/ev-all-summary/ev-all-summary.component';
import { EvBigLineChartComponent } from './home/shared/widgets/ev-big-line-chart/ev-big-line-chart.component';
import { CompaniesNoEvComponent } from './home/shared/widgets/companies-no-ev/companies-no-ev.component';

@NgModule({
  declarations: [
    AppComponent,
    NavComponent,
    HomeComponent,
    SalePointsComponent,
    GeofilteringComponent,
    GeoSalesComponent,
    SalepointOlComponent,
    DashboardComponent,
    AreaComponent,
    CardComponent,
    PieComponent,
    Chart1Component,
    HouseinfoComponent,
    Tab1Component,
    Tab2Component,
    Tab3Component,
    EvInfoChartComponent,
    EvInfoChart1Component,
    EvAllSummaryComponent,
    EvBigLineChartComponent,
    CompaniesNoEvComponent,
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    MaterialModule,
    FormsModule,
    HttpClientModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    ReactiveFormsModule,
    NgMultiSelectDropDownModule.forRoot(),
    LayoutModule,
    MatToolbarModule,
    MatButtonModule,
    MatSidenavModule,
    MatIconModule,
    MatListModule,
    MatGridListModule,
    MatCardModule,
    MatMenuModule,
    HighchartsChartModule,
    FlexLayoutModule,
    MatTabsModule
  ],
  providers: [SpmainService, SalepointOlService, DashboardService, EvDashboardService
  ],
  bootstrap: [AppComponent],
  entryComponents: [HomeComponent, SalePointsComponent, SalepointOlComponent, DashboardComponent
  , AreaComponent, CardComponent, PieComponent]
})
export class AppModule { }
