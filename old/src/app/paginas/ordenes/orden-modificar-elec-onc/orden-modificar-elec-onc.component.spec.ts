import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OrdenModificarElecOncComponent } from './orden-modificar-elec-onc.component';

describe('OrdenModificarElecOncComponent', () => {
  let component: OrdenModificarElecOncComponent;
  let fixture: ComponentFixture<OrdenModificarElecOncComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ OrdenModificarElecOncComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(OrdenModificarElecOncComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
