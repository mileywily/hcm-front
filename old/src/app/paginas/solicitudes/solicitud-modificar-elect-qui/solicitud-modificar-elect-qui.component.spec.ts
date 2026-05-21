import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SolicitudModificarElectQuiComponent } from './solicitud-modificar-elect-qui.component';

describe('SolicitudModificarElectQuiComponent', () => {
  let component: SolicitudModificarElectQuiComponent;
  let fixture: ComponentFixture<SolicitudModificarElectQuiComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SolicitudModificarElectQuiComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SolicitudModificarElectQuiComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
