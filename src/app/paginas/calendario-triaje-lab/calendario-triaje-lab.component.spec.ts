import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CalendarioTriajeLabComponent } from './calendario-triaje-lab.component';

describe('CalendarioTriajeLabComponent', () => {
  let component: CalendarioTriajeLabComponent;
  let fixture: ComponentFixture<CalendarioTriajeLabComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CalendarioTriajeLabComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CalendarioTriajeLabComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
