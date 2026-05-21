import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ReporteCuposElecOncologicoComponent } from './reporte-cupos-elec-oncologico.component';

describe('ReporteCuposElecOncologicoComponent', () => {
  let component: ReporteCuposElecOncologicoComponent;
  let fixture: ComponentFixture<ReporteCuposElecOncologicoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ReporteCuposElecOncologicoComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ReporteCuposElecOncologicoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
