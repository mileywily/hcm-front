import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ServiciosSolicitudAbiertasQuiComponent } from './servicios-solicitud-abiertas-qui.component';

describe('ServiciosSolicitudAbiertasQuiComponent', () => {
  let component: ServiciosSolicitudAbiertasQuiComponent;
  let fixture: ComponentFixture<ServiciosSolicitudAbiertasQuiComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ServiciosSolicitudAbiertasQuiComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ServiciosSolicitudAbiertasQuiComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
