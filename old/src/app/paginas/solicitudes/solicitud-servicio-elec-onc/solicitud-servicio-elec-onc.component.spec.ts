import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SolicitudServicioElecOncComponent } from './solicitud-servicio-elec-onc.component';

describe('SolicitudServicioElecOncComponent', () => {
  let component: SolicitudServicioElecOncComponent;
  let fixture: ComponentFixture<SolicitudServicioElecOncComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SolicitudServicioElecOncComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SolicitudServicioElecOncComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
