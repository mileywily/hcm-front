import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ServiciosSolicitudAbiertasImgComponent } from './servicios-solicitud-abiertas-img.component';

describe('ServiciosSolicitudAbiertasImgComponent', () => {
  let component: ServiciosSolicitudAbiertasImgComponent;
  let fixture: ComponentFixture<ServiciosSolicitudAbiertasImgComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ServiciosSolicitudAbiertasImgComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ServiciosSolicitudAbiertasImgComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
