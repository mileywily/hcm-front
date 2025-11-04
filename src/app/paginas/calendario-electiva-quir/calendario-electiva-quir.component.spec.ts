import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CalendarioElectivaQuirComponent } from './calendario-electiva-quir.component';

describe('CalendarioElectivaQuirComponent', () => {
  let component: CalendarioElectivaQuirComponent;
  let fixture: ComponentFixture<CalendarioElectivaQuirComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CalendarioElectivaQuirComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CalendarioElectivaQuirComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
