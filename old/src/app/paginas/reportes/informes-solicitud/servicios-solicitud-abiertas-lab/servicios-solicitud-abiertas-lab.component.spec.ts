import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ServiciosSolicitudAbiertasLabComponent } from './servicios-solicitud-abiertas-lab.component';

describe('ServiciosSolicitudAbiertasLabComponent', () => {
  let component: ServiciosSolicitudAbiertasLabComponent;
  let fixture: ComponentFixture<ServiciosSolicitudAbiertasLabComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ServiciosSolicitudAbiertasLabComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ServiciosSolicitudAbiertasLabComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
