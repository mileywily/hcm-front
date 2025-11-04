import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ServicioMedicoComponent } from './servicio-medico.component';

describe('ServicioMedicoComponent', () => {
  let component: ServicioMedicoComponent;
  let fixture: ComponentFixture<ServicioMedicoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ServicioMedicoComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ServicioMedicoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
