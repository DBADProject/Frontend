import {Component, OnInit} from '@angular/core';
import {Datasource, DummyData} from '../interfaces/data-interface';
import {HttpClientService} from '../http-client.service';
import {FormBuilder, UntypedFormGroup} from '@angular/forms';
import {DataSource} from '@angular/cdk/collections';
import {MatTableDataSource} from '@angular/material/table';

@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.scss']
})
export class TableComponent implements OnInit {

  sources: Set<Datasource>;
  sourceForm: UntypedFormGroup;
  sourceInput: Datasource = null;
  currData: Set<DummyData> = new Set<DummyData>();
  dataSource;
  columnsToDisplay = ['name', 'value'];

  constructor(private clientService: HttpClientService) {}

  ngOnInit(): void {
    this.clientService.getSources().subscribe((data: Set<Datasource>) => {
      this.sources = data;
    });
  }

  fillData(id): void{
    this.clientService.getDataById(id).subscribe((data: Set<DummyData>) => {
      console.log(data);
      console.log(data instanceof Set);
      this.currData = data;
      this.dataSource = Array.from(this.currData);
    });
  }
}
