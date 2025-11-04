import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ReporteOrdenQuiComponent } from './reporte-orden-qui.component';

describe('ReporteOrdenQuiComponent', () => {
  let component: ReporteOrdenQuiComponent;
  let fixture: ComponentFixture<ReporteOrdenQuiComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ReporteOrdenQuiComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ReporteOrdenQuiComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
