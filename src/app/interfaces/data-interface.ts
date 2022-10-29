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
