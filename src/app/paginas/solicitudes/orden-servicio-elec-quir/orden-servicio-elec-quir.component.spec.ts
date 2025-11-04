import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OrdenServicioElecQuirComponent } from './orden-servicio-elec-quir.component';

describe('OrdenServicioElecQuirComponent', () => {
  let component: OrdenServicioElecQuirComponent;
  let fixture: ComponentFixture<OrdenServicioElecQuirComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ OrdenServicioElecQuirComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(OrdenServicioElecQuirComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
