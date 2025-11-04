import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OrdenModificarElecQuirComponent } from './orden-modificar-elec-quir.component';

describe('OrdenModificarElecQuirComponent', () => {
  let component: OrdenModificarElecQuirComponent;
  let fixture: ComponentFixture<OrdenModificarElecQuirComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ OrdenModificarElecQuirComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(OrdenModificarElecQuirComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
