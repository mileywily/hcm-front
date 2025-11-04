import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SolicitudModificarElectOncComponent } from './solicitud-modificar-elect-onc.component';

describe('SolicitudModificarElectOncComponent', () => {
  let component: SolicitudModificarElectOncComponent;
  let fixture: ComponentFixture<SolicitudModificarElectOncComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SolicitudModificarElectOncComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SolicitudModificarElectOncComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
