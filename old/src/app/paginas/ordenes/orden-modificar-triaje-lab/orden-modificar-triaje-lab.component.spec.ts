import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OrdenModificarTriajeLabComponent } from './orden-modificar-triaje-lab.component';

describe('OrdenModificarTriajeLabComponent', () => {
  let component: OrdenModificarTriajeLabComponent;
  let fixture: ComponentFixture<OrdenModificarTriajeLabComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ OrdenModificarTriajeLabComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(OrdenModificarTriajeLabComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
