import {Component, OnInit} from '@angular/core';
import * as atlas from 'azure-maps-control';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {TrafficDTO, TrafficInputDTO} from '../interfaces/data-interface';
import {HttpClientService} from '../http-client.service';
import {Shape} from 'azure-maps-control';
import {FrameBasedAnimationTimer} from '../../animations';
import FeatureCollection = atlas.data.FeatureCollection;
import {MatDatepickerModule} from '@angular/material/datepicker';


@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.scss']
})

export class MapComponent implements OnInit {

  public date;
  public dto: TrafficInputDTO = {
    wind: 100,
    temperature: 100,
    pressure: 100,
    humidity: 100,
    time: '2022-01-01T00:00:00.000Z',
    bikeAmount: 100,
    bikeShareDuration: 100,
    bikesShared: 100
  } as TrafficInputDTO;
  public traffic: TrafficDTO[];
  public datasource = new atlas.source.DataSource();
  public timer;

  private maxScale = 90;
  private colorExpressions = [];

  constructor(private clientService: HttpClientService) {
  }

  ngOnInit(): void {
    this.createMap();
  }

  createMap(): void {
    const map = new atlas.Map('dbadMapTraffic', {
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
      //center: new atlas.data.Position(-72.987576, 40.752312),
      center: new atlas.data.Position(-36.99, 20.43),
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

      const popup = new atlas.Popup({
        position: [0, 0]
      });

      map.sources.add(this.datasource);

      for (let i = 0; i <= 12; i ++) {
        this.colorExpressions.push([
          'interpolate',
          ['linear'],
          ['get', 'trafficAmount' + i ],
          0, 'rgb(255,0,0)',         // Red
          this.maxScale / 2, 'rgb(255,255,0)',                    // Yellow
          this.maxScale, 'rgb(0,255,0)'           // Green
        ]);
      }

      const polygonLayer = new atlas.layer.PolygonLayer(this.datasource, null, {
        fillColor: this.colorExpressions[0],
        fillOpacity: 0.6
      });

      this.createLegend();

      map.layers.add(polygonLayer, 'labels');

      // Create an animation loop.
      this.timer = new FrameBasedAnimationTimer(this.colorExpressions.length - 1, (frameIdx) => {
        polygonLayer.setOptions({ fillColor: this.colorExpressions[frameIdx] });
        document.getElementsByClassName('legend-label')[0].innerHTML = frameIdx * 2 + ':00 ';
      }, {
        duration: 10000,
        loop: true
      });

      map.events.add('mousemove', polygonLayer, e => {
        if (e.shapes && e.shapes.length > 0) {
          const properties = (e.shapes[0] as Shape).getProperties();
          const html = ['<table style="padding: 4pt; border-collapse: collapse;"><thead style="font-weight: bold">' +
          '<tr><td style="border-style: solid;">Time</td><td style="border-style: solid;">Traffic Speed</td>' +
          '</tr></thead>'];

          for (let i = 0; i < 12; i ++ ) {
            html.push( '<tr><td style="border-style: solid;">' + 2*i + ':00</td>\n');
            html.push( '<td style="border-style: solid;">' + properties.trafficAmount[i] + '</td>');
          }

          html.push('</table>');

          popup.setOptions({
            content: html.join(''),
            position: e.position
          });

          // Open the popup.
          popup.open(map);
        }
      });

      // Add a mouse leave event to the polygon layer to hide the popup.
      map.events.add('mouseleave', polygonLayer, e => {
        popup.close();
      });
    });
  }

  createLegend(): void {
    const canvas: any = document.getElementById('legendCanvas');
    const ctx = canvas.getContext('2d');

    // Create a linear gradient for the legend.
    const grd = ctx.createLinearGradient(0, 0, 256, 0);
    grd.addColorStop(0, 'rgb(255,0,0)');      // Red
    grd.addColorStop(0.5, 'rgb(255,255,0)');   // Yellow
    grd.addColorStop(1, 'rgb(0,255,0)');        // Green

    ctx.fillStyle = grd;
    ctx.fillRect(0, 0, canvas.width, canvas.height);
  }

  submit(): void {
    this.dto.time = this.date.toISOString();
    console.log(this.dto);
    this.datasource.clear();
    this.clientService.getTrafficAmount(this.dto).subscribe((data: Set<TrafficDTO>) => {
      console.log(data);
      data.forEach(dtoData => {
        const polygon = new atlas.data.Feature(new atlas.data.Polygon(([
          [dtoData.coordinates[0] + 0.01, dtoData.coordinates[1]],
          [dtoData.coordinates[0], dtoData.coordinates[1]],
          [dtoData.coordinates[0], dtoData.coordinates[1] + 0.005],
          [dtoData.coordinates[0] + 0.01, dtoData.coordinates[1] + 0.005]
        ])), {trafficAmount: dtoData.trafficAmount});
        const obj = [];
        for (let i = 0; i < 13; i += 1) {
          obj['trafficAmount' + i] = dtoData.trafficAmount[i];
        }
        Object.assign(polygon.properties, obj);
        this.datasource.add(polygon);
      });
      console.log(this.datasource.getShapes());

    });
  }

  togglePlayPause(): void {
    if (this.timer.isPlaying()) {
      this.timer.pause();
    } else {
      this.timer.play();
    }
}
}
