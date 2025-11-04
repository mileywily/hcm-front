import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EnteComponent } from './ente.component';

describe('EnteComponent', () => {
  let component: EnteComponent;
  let fixture: ComponentFixture<EnteComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EnteComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EnteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
