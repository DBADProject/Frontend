import { Component, OnInit } from '@angular/core';
import * as atlas from 'azure-maps-control';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {TrafficDTO, TrafficInputDTO} from '../interfaces/data-interface';
import {HttpClientService} from '../http-client.service';


@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.scss']
})

export class MapComponent implements OnInit {

  public date;
  public dto: TrafficInputDTO = {
    wind : 10,
    temperature : 25,
    pressure: 1000,
    humidity: 10,
    time: '2022-01-01T00:00:00.000Z',
    bikeAmount: 0,
    bikeShareDuration: 0
  } as TrafficInputDTO;
  public traffic: Set<TrafficDTO>;
  public datasource = new atlas.source.DataSource();
  public defaultColor = '#FFEDA0';
  constructor(private clientService: HttpClientService) { }

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
      pitch: 45,
      center: new atlas.data.Position( -72.987576, 40.752312),
      authOptions: {
        authType: atlas.AuthenticationType.subscriptionKey,
        subscriptionKey: 'wxJUUD6JB8B5mv2dR4ePF1UiAac0v-KaUCpjR4A00JY'
      }
    });



    map.controls.add([
      new atlas.control.ZoomControl(),
      new atlas.control.CompassControl(),
      new atlas.control.PitchControl(),
      new atlas.control.StyleControl()
    ], {
      position: atlas.ControlPosition.TopRight
    });

    map.events.add('ready', () => {

      const trafficAmount = [
        'step',
        ['get', 'traffic'],
        [
          0, '#e3fe4c',
          50, '#fded3c',
          150, '#fc932a',
          200, '#E31A1C',
          250, '#BD0026',
          300, '#800026'
        ]
      ];

      map.sources.add(this.datasource);

      this.datasource.setOptions(this.traffic);


      map.layers.add(new atlas.layer.PolygonLayer(this.datasource));
    });
  }
  submit(): void {
    this.dto.time = this.date.toISOString();
    console.log(this.dto);
    this.clientService.getTrafficAmount(this.dto).subscribe((data: Set<TrafficDTO>) => {
      data.forEach(dtoData => {
        const polygon = new atlas.data.Feature(new atlas.data.Polygon(([
          [dtoData.coordinates[0], dtoData.coordinates[1]],
          [dtoData.coordinates[0] + 0.5, dtoData.coordinates[1]],
          [dtoData.coordinates[0], dtoData.coordinates[1] + 0.5],
          [dtoData.coordinates[0] + 0.5, dtoData.coordinates[1] + 0.5]
        ])), {Traffic: dtoData.trafficAmount});

        this.datasource.add(polygon);
      });
      console.log(this.datasource);

    });
  }

  isDisabled(): boolean{

     return this.date == null;

  }
}
