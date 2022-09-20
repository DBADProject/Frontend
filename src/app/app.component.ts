import { Component } from '@angular/core';
import {ThemePalette} from '@angular/material/core';
import {RouterLink} from '@angular/router';
import {DashboardComponent} from './dashboard/dashboard.component';



@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'DBAD';
  color: ThemePalette = 'accent';
  currLink = '/dashboard';
}
