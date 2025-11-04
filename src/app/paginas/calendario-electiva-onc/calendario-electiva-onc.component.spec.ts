import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CalendarioElectivaOncComponent } from './calendario-electiva-onc.component';

describe('CalendarioElectivaOncComponent', () => {
  let component: CalendarioElectivaOncComponent;
  let fixture: ComponentFixture<CalendarioElectivaOncComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CalendarioElectivaOncComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CalendarioElectivaOncComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
