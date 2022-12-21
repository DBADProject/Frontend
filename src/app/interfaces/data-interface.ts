export interface DummyData{
  name: string;
  value: number;
  id: string;
}

export interface Datasource{
  name: string;
  data: Set<DummyData>;
  id: string;
}

export interface TimeTraffic{
  time: number;
  trafficValue: number;
}

export interface TrafficInputDTO{
  wind: number;
  humidity: number;
  temperature: number;
  pressure: number;
  time: string;
  bikeAmount: number;
  bikeShareDuration: number;
}
export interface TrafficDTO{
  coordinates: number[];
  trafficAmount: number[];
  trafficSpeed: number[];
  trafficTravelTime: number[];
  testValue: number;
}
