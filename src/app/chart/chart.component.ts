import { Component, OnInit } from '@angular/core';
import {Datasource, DummyData, TimeTraffic} from '../interfaces/data-interface';
import {HttpClientService} from '../http-client.service';
import {FormGroup} from '@angular/forms';



@Component({
  selector: 'app-chart',
  templateUrl: './chart.component.html',
  styleUrls: ['./chart.component.scss']
})
export class ChartComponent implements OnInit {


  times = Array<number>();
  trafficValues = Array<number>();
  trafficMap = new Map< number, Array<TimeTraffic>>();
  trafficAr = Array<TimeTraffic>();



  public graph = {
    data: [
      { x: this.times, y: this.trafficValues, type: 'bar', marker: {color: 'red'} },
    ],
    layout: {width: 1496, height: 600, title: 'A Fancy Plot'}
  };

  constructor(private clientService: HttpClientService) { }

  ngOnInit(): void {
    this.fillData(10, 25, 0);
  }


  fillData(wind, temperature, rainfalll): void{
    this.clientService.getTrafficByWeather(wind, temperature, rainfalll).subscribe((data: Array<TimeTraffic>) => {
      const timeArray = Array<number>(24);
      const valueArray = Array<number>(24);

      console.log(data);
      this.trafficAr = data;
      console.log(this.trafficAr instanceof Array);
      console.log(this.trafficAr.length);

      for (let i = 0; i < this.trafficAr.length; i++) {
        timeArray[i] = this.trafficAr[i].time;
        valueArray[i] = this.trafficAr[i].trafficValue;
      }

      console.log(valueArray);


      this.graph.data.fill({ x: timeArray, y: valueArray, type: 'bar', marker: {color: 'red'} });
    });
  }
  sliderChange(): void {

    const wind = document.querySelector('#wind').getAttribute('value');
    const temperature = document.querySelector('#temperature').getAttribute('value');
    const rainfall = document.querySelector('#rainfall').getAttribute('value');

    this.fillData(wind, temperature, rainfall);


  }
}
