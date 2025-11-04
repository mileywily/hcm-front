import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ReporteOrdenImgComponent } from './reporte-orden-img.component';

describe('ReporteOrdenImgComponent', () => {
  let component: ReporteOrdenImgComponent;
  let fixture: ComponentFixture<ReporteOrdenImgComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ReporteOrdenImgComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ReporteOrdenImgComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
