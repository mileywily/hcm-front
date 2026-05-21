import { TestBed, ComponentFixture } from '@angular/core/testing';
import { AppComponent } from './app.component';

describe('AppComponent', () => {
  // 1. Declaramos las variables a nivel global del bloque de pruebas
  let fixture: ComponentFixture<AppComponent>;
  let app: AppComponent;

  beforeEach(async () => {
    // Configuramos el módulo
    await TestBed.configureTestingModule({
      imports: [AppComponent],
    }).compileComponents();

    // 2. Inicializamos el fixture y la instancia del componente una sola vez por cada test
    fixture = TestBed.createComponent(AppComponent);
    app = fixture.componentInstance;
  });

  it('should create the app', () => {
    // 3. Validamos directamente
    expect(app).toBeTruthy();
  });

  it(`should have the 'hcm-front' title`, () => {
    expect(app.title).toEqual('hcm-front');
  });

  it('should render title', () => {
    // Aquí usamos el fixture para detectar cambios y acceder al DOM
    fixture.detectChanges();
    const compiled = fixture.nativeElement as HTMLElement;

    expect(compiled.querySelector('h1')?.textContent).toContain('hcm-front');
  });
});
