import { NgModule } from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {DashboardComponent} from '../dashboard/dashboard.component';
import {TableComponent} from '../table/table.component';
import {ChartComponent} from '../chart/chart.component';
import {MapComponent} from '../map/map.component';
import {AccidentMapComponent} from '../accident-map/accident-map.component';

const routes: Routes = [
  { path: 'accidents', component: AccidentMapComponent },
  { path: 'traffic', component: MapComponent},
  { path: '', redirectTo: '/traffic', pathMatch: 'full'}
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
