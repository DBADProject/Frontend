import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule} from './app-routing/app-routing.module';
import { AppComponent } from './app.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {MatTabsModule} from '@angular/material/tabs';
import { TableComponent } from './table/table.component';
import {HttpClientModule} from '@angular/common/http';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatSelectModule} from '@angular/material/select';
import {MatOptionModule} from '@angular/material/core';
import {MatTableModule} from '@angular/material/table';
import { ChartComponent } from './chart/chart.component';
import * as PlotlyJS from 'plotly.js-dist-min';
import { PlotlyModule } from 'angular-plotly.js';
import {MatSliderModule} from '@angular/material/slider';
import { MapComponent } from './map/map.component';
import {MatExpansionModule} from '@angular/material/expansion';
import {MatDatepickerModule} from '@angular/material/datepicker';
import {NgxMatDatetimePickerModule, NgxMatNativeDateModule, NgxMatTimepickerModule} from '@angular-material-components/datetime-picker';
import {MatInputModule} from '@angular/material/input';
import {MatButtonModule} from '@angular/material/button';

PlotlyModule.plotlyjs = PlotlyJS;

@NgModule({
  declarations: [
    AppComponent,
    DashboardComponent,
    TableComponent,
    ChartComponent,
    MapComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    BrowserAnimationsModule,
    MatTabsModule,
    HttpClientModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatSelectModule,
    MatOptionModule,
    MatTableModule,
    PlotlyModule,
    MatSliderModule,
    MatExpansionModule,
    MatDatepickerModule,
    NgxMatDatetimePickerModule,
    NgxMatNativeDateModule,
    NgxMatTimepickerModule,
    MatInputModule,
    MatButtonModule
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
