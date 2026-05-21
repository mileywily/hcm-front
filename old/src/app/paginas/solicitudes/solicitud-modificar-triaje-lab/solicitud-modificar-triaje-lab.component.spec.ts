import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SolicitudModificarTriajeLabComponent } from './solicitud-modificar-triaje-lab.component';

describe('SolicitudModificarTriajeLabComponent', () => {
  let component: SolicitudModificarTriajeLabComponent;
  let fixture: ComponentFixture<SolicitudModificarTriajeLabComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SolicitudModificarTriajeLabComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SolicitudModificarTriajeLabComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
