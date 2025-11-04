import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SolicitudServicioElecMedComponent } from './solicitud-servicio-elec-med.component';

describe('SolicitudServicioElecMedComponent', () => {
  let component: SolicitudServicioElecMedComponent;
  let fixture: ComponentFixture<SolicitudServicioElecMedComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SolicitudServicioElecMedComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SolicitudServicioElecMedComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
