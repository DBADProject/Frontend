import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable, throwError} from 'rxjs';
import {catchError, retry} from 'rxjs/operators';
import {Data} from '@angular/router';
import {AccidentDTO, AccidentInputDTO, Datasource, DummyData, TimeTraffic, TrafficDTO, TrafficInputDTO} from './interfaces/data-interface';

@Injectable({
  providedIn: 'root'
})

export class HttpClientService {

  constructor(private http: HttpClient) { }


  getSources(): Observable<Set<Datasource>>{
    return this.http.get<Set<Datasource>>('http://localhost:8083/datasources');
  }

  getDataById(id: string): Observable<Set<DummyData>>{
    return this.http.get<Set<DummyData>>('http://localhost:8083/datasources/' + id);
  }

  getTrafficByWeather(wind: number, temperature: number, rainfall: number): Observable<Array<TimeTraffic>>{
    return this.http.get<Array<TimeTraffic>>('http://localhost:8083/traffic/?wind=' + wind +
      '&temperature=' + temperature + '&rainfall=' + rainfall);
  }
  getTrafficAmount(input: TrafficInputDTO): Observable<Set<TrafficDTO>>{
    return this.http.post<Set<TrafficDTO>>('http://localhost:8083/traffic', input);
  }
  getAccidents(input: AccidentInputDTO): Observable<Set<AccidentDTO>>{
    return this.http.post<Set<AccidentDTO>>('http://localhost:8083/accidents', input);
  }
}
