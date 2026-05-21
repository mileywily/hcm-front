import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AuditoriasSolicitudComponent } from './auditorias-solicitud.component';

describe('AuditoriasSolicitudComponent', () => {
  let component: AuditoriasSolicitudComponent;
  let fixture: ComponentFixture<AuditoriasSolicitudComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AuditoriasSolicitudComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AuditoriasSolicitudComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
