import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OrdenServicioElecOncComponent } from './orden-servicio-elec-onc.component';

describe('OrdenServicioElecOncComponent', () => {
  let component: OrdenServicioElecOncComponent;
  let fixture: ComponentFixture<OrdenServicioElecOncComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ OrdenServicioElecOncComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(OrdenServicioElecOncComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
