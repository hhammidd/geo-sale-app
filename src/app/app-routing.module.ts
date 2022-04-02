import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {HomeComponent} from "./home/home.component";
import {SalepointOlComponent} from "./salepoint-ol/salepoint-ol.component";
import {DashboardComponent} from "./dashboard/dashboard.component";
import {GeofilteringComponent} from "./sale-points/geofiltering/geofiltering.component";
import {HouseinfoComponent} from "./houseinfo/houseinfo/houseinfo.component";


const routes: Routes = [

  {path: 'home', component: HomeComponent},
  {path: 'salepoints', component: GeofilteringComponent},
  {path: 'salepointol', component: SalepointOlComponent},
  {path: 'dashboard', component: DashboardComponent},
  {path: 'houseinfo', component: HouseinfoComponent},
  // {path: 'salepointdashboardmap', component: SalepointdashboardmapComponent},
  // {path: '404', component: NotFoundComponent},
  // {path: '**', redirectTo: '/404'}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}

export const routingComponents = [
  // NotFoundComponent,
  // SalePointsComponent,
  HomeComponent
];
