import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OrdenServicioTriajeLabComponent } from './orden-servicio-triaje-lab.component';

describe('OrdenServicioTriajeLabComponent', () => {
  let component: OrdenServicioTriajeLabComponent;
  let fixture: ComponentFixture<OrdenServicioTriajeLabComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ OrdenServicioTriajeLabComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(OrdenServicioTriajeLabComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
