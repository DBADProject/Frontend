import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AccidentMapComponent } from './accident-map.component';

describe('AccidentMapComponent', () => {
  let component: AccidentMapComponent;
  let fixture: ComponentFixture<AccidentMapComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AccidentMapComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AccidentMapComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
