import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TipoCentroComponent } from './tipo-centro.component';

describe('TipoCentroComponent', () => {
  let component: TipoCentroComponent;
  let fixture: ComponentFixture<TipoCentroComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TipoCentroComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TipoCentroComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
