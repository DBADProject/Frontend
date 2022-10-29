import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable, throwError} from 'rxjs';
import {catchError, retry} from 'rxjs/operators';
import {Data} from '@angular/router';
import {Datasource, DummyData, TimeTraffic} from './interfaces/data-interface';

@Injectable({
  providedIn: 'root'
})

export class HttpClientService {

  constructor(private http: HttpClient) { }


  getSources(): Observable<Set<Datasource>>{
    return this.http.get<Set<Datasource>>('http://localhost:8080/datasources');
  }

  getDataById(id: string): Observable<Set<DummyData>>{
    return this.http.get<Set<DummyData>>('http://localhost:8080/datasources/' + id);
  }

  getTrafficByWeather(wind: number, temperature: number, rainfall: number): Observable<Array<TimeTraffic>>{
    return this.http.get<Array<TimeTraffic>>('http://localhost:8080/traffic/?wind=' + wind +
      '&temperature=' + temperature + '&rainfall=' + rainfall);
  }
}
