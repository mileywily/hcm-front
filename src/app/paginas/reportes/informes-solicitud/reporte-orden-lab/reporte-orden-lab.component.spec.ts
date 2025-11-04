import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ReporteOrdenLabComponent } from './reporte-orden-lab.component';

describe('ReporteOrdenLabComponent', () => {
  let component: ReporteOrdenLabComponent;
  let fixture: ComponentFixture<ReporteOrdenLabComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ReporteOrdenLabComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ReporteOrdenLabComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
