import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CalendarioTriajeImgComponent } from './calendario-triaje-img.component';

describe('CalendarioTriajeImgComponent', () => {
  let component: CalendarioTriajeImgComponent;
  let fixture: ComponentFixture<CalendarioTriajeImgComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CalendarioTriajeImgComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CalendarioTriajeImgComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
