import { NgModule } from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {DashboardComponent} from '../dashboard/dashboard.component';
import {TableComponent} from '../table/table.component';

const routes: Routes = [
  { path: 'dashboard', component: DashboardComponent },
  { path: 'table', component: TableComponent },
  { path: '', redirectTo: '/dashboard', pathMatch: 'full'}
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
