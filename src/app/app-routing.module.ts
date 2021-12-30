import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {HomeComponent} from "./home/home.component";
import {SalePointsComponent} from "./sale-points/sale-points.component";
import {SalepointOlComponent} from "./salepoint-ol/salepoint-ol.component";
import {DashboardComponent} from "./dashboard/dashboard.component";


const routes: Routes = [

  // {
  //   path: 'studies', component: StudiesComponent,
  //   children: [
  //     {path: 'brand', component: BrandsComponent}, // Not working child
  //     {path: 'service', component: ServicesComponent},
  //     {path: 'potential', component: PotentialsComponent},
  //     {path: 'parameter', component: ParametersComponent},
  //
  //   ]
  // },
  // {path: 'home', component: HomeComponent,
  //   children: [
  //     {path: 'homegeo', component: HomegeoComponent},
  //     {path: 'sp', component: SpmaincontainerComponent},
  //   ]
  // },
  {path: 'home', component: HomeComponent},
  {path: 'salepoints', component: SalePointsComponent},
  {path: 'salepointol', component: SalepointOlComponent},
  {path: 'dashboard', component: DashboardComponent},
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
  // ProductsComponent,
  // StudiesComponent,
  // MapComponent,
  // BuyinghouseComponent,
  // CountryappComponent,
  HomeComponent
];
