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


@NgModule({
  declarations: [
    AppComponent,
    NavComponent,
    HomeComponent,
    SalePointsComponent,
    GeofilteringComponent,
    GeoSalesComponent,
    SalepointOlComponent,
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
  ],
  providers: [SpmainService],
  bootstrap: [AppComponent],
  entryComponents: [HomeComponent, SalePointsComponent, SalepointOlComponent]
})
export class AppModule { }
