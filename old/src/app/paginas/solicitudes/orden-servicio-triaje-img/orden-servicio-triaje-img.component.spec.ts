import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OrdenServicioTriajeImgComponent } from './orden-servicio-triaje-img.component';

describe('OrdenServicioTriajeImgComponent', () => {
  let component: OrdenServicioTriajeImgComponent;
  let fixture: ComponentFixture<OrdenServicioTriajeImgComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ OrdenServicioTriajeImgComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(OrdenServicioTriajeImgComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
