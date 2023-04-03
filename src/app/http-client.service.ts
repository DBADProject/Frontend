import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {AccidentDTO, AccidentInputDTO, Datasource, DummyData, TimeTraffic, TrafficDTO, TrafficInputDTO} from './interfaces/data-interface';
import {environment} from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})

export class HttpClientService {
  private baseUrl = environment.baseURL;

  constructor(private http: HttpClient) {
  }


  getSources(): Observable<Set<Datasource>> {
    return this.http.get<Set<Datasource>>(`${this.baseUrl}/datasources`);
  }

  getDataById(id: string): Observable<Set<DummyData>> {
    return this.http.get<Set<DummyData>>(`${this.baseUrl}/datasources/${id}`);
  }

  getTrafficByWeather(wind: number, temperature: number, rainfall: number): Observable<Array<TimeTraffic>> {
    return this.http.get<Array<TimeTraffic>>(`${this.baseUrl}/traffic/?wind=${wind}&temperature=${temperature}&rainfall=${rainfall}`);
  }

  getTrafficAmount(input: TrafficInputDTO): Observable<Set<TrafficDTO>> {
    return this.http.post<Set<TrafficDTO>>(`${this.baseUrl}/traffic`, input);
  }

  getAccidents(input: AccidentInputDTO): Observable<Set<AccidentDTO>> {
    return this.http.post<Set<AccidentDTO>>(`${this.baseUrl}/accidents`, input);
  }
}
