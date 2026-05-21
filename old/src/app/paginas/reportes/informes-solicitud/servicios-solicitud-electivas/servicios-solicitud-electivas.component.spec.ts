import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ServiciosSolicitudElectivasComponent } from './servicios-solicitud-electivas.component';

describe('ServiciosSolicitudElectivasComponent', () => {
  let component: ServiciosSolicitudElectivasComponent;
  let fixture: ComponentFixture<ServiciosSolicitudElectivasComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ServiciosSolicitudElectivasComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ServiciosSolicitudElectivasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
