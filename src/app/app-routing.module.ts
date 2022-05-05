import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {HomeComponent} from "./home/home.component";
import {SalepointOlComponent} from "./salepoint-ol/salepoint-ol.component";
import {DashboardComponent} from "./dashboard/dashboard.component";
import {GeofilteringComponent} from "./sale-points/geofiltering/geofiltering.component";
import {HouseinfoComponent} from "./houseinfo/houseinfo/houseinfo.component";
import {LocalizationComponent} from "./localization/localization.component";
import {FormmeComponent} from "./formme/formme.component";


const routes: Routes = [

  {path: 'home', component: HomeComponent},
  {path: 'salepoints', component: GeofilteringComponent},
  {path: 'salepointol', component: SalepointOlComponent},
  {path: 'dashboard', component: DashboardComponent},
  {path: 'houseinfo', component: HouseinfoComponent},
  {path: 'localization', component: LocalizationComponent},
  {path: 'form', component: FormmeComponent},
  {path: '', redirectTo: '/form', pathMatch: 'full'}
  // {path: 'salepointdashboardmap', component: SalepointdashboardmapComponent},
  // {path: '404', component: NotFoundComponent},
  // {path: '**', redirectTo: '/404'}
];

@NgModule({
  // imports: [RouterModule.forRoot(routes, { useHash: true })],
  imports: [RouterModule.forRoot(routes, { useHash: true })],

  exports: [RouterModule]
})
export class AppRoutingModule {
}

export const routingComponents = [
  // NotFoundComponent,
  // SalePointsComponent,
  HomeComponent
];
