import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ReporteCuposElecQuirurgicoComponent } from './reporte-cupos-elec-quirurgico.component';

describe('ReporteCuposElecQuirurgicoComponent', () => {
  let component: ReporteCuposElecQuirurgicoComponent;
  let fixture: ComponentFixture<ReporteCuposElecQuirurgicoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ReporteCuposElecQuirurgicoComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ReporteCuposElecQuirurgicoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
