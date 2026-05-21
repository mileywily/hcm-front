import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ServiciosSolicitudAbiertasOnComponent } from './servicios-solicitud-abiertas-on.component';

describe('ServiciosSolicitudAbiertasOnComponent', () => {
  let component: ServiciosSolicitudAbiertasOnComponent;
  let fixture: ComponentFixture<ServiciosSolicitudAbiertasOnComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ServiciosSolicitudAbiertasOnComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ServiciosSolicitudAbiertasOnComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
