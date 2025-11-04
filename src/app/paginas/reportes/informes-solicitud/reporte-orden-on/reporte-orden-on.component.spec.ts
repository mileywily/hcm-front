import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ReporteOrdenOnComponent } from './reporte-orden-on.component';

describe('ReporteOrdenOnComponent', () => {
  let component: ReporteOrdenOnComponent;
  let fixture: ComponentFixture<ReporteOrdenOnComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ReporteOrdenOnComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ReporteOrdenOnComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
