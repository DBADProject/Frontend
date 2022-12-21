import { NgModule } from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {DashboardComponent} from '../dashboard/dashboard.component';
import {TableComponent} from '../table/table.component';
import {ChartComponent} from '../chart/chart.component';
import {MapComponent} from '../map/map.component';

const routes: Routes = [
  { path: 'dashboard', component: DashboardComponent },
  { path: 'table', component: TableComponent },
  { path: 'chart', component: ChartComponent },
  { path: 'map', component: MapComponent},
  { path: '', redirectTo: '/map', pathMatch: 'full'}
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes)
  ],
  exports: [
    RouterModule
  ]
})
export class AppRoutingModule { }
