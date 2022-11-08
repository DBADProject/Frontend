import { Component, OnInit } from '@angular/core';
import * as atlas from 'azure-maps-control';

@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.scss']
})
export class MapComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
    this.createMap();
  }

  createMap(): void {
    const map = new atlas.Map('dbadMap', {
      language: 'en-US',
      view: 'Auto',
      showBuildingModels: true,
      showLogo: false,
      style: 'road',
      zoom: 11,
      autoResize: true,
      enableAccessibility: false,
      showFeedbackLink: false,
      center: new atlas.data.Position( -72.987576, 40.752312),
      authOptions: {
        authType: atlas.AuthenticationType.subscriptionKey,
        subscriptionKey: 'wxJUUD6JB8B5mv2dR4ePF1UiAac0v-KaUCpjR4A00JY'
      }
    });



    /*map.controls.add([
      new atlas.control.ZoomControl(),
      new atlas.control.CompassControl(),
      new atlas.control.PitchControl(),
      new atlas.control.StyleControl()
    ], {
      position: atlas.ControlPosition.TopRight
    });

     */

    map.events.add('ready', () => {

      const dataSource = new atlas.source.DataSource();
      map.sources.add(dataSource);
      const layer = new atlas.layer.SymbolLayer(dataSource);
      map.layers.add(layer);
      dataSource.add(new atlas.data.Point([6.7735, 51.2277]));

      const datasource = new atlas.source.DataSource();
      map.sources.add(datasource);

      datasource.importDataFromUrl('https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/all_week.geojson');

      map.layers.add(new atlas.layer.HeatMapLayer(datasource, null, {
        radius: 10,
        opacity: 0.8
      }), 'labels');
    });


  }
  sliderChange(): void {

    const wind = document.querySelector('#wind').getAttribute('value');
    const temperature = document.querySelector('#temperature').getAttribute('value');
    const humidity = document.querySelector('#humidity').getAttribute('value');
    const pressure = document.querySelector('#pressure').getAttribute('value');

    // this.fillData(wind, temperature, rainfall);

  }

}
