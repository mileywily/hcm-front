import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ServicioProveedorComponent } from './servicio-proveedor.component';

describe('ServicioProveedorComponent', () => {
  let component: ServicioProveedorComponent;
  let fixture: ComponentFixture<ServicioProveedorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ServicioProveedorComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ServicioProveedorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
