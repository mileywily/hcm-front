Directrices de Refactorización para Antigravity (Angular 18)

1. Objetivo Principal
   Refactorizar y actualizar la aplicación de Angular 14 a Angular 18, eliminando la deuda técnica. El objetivo es migrar hacia las APIs modernas de Angular (Standalone Components, Signals, nuevo Control Flow @if/@for), mejorar el rendimiento de renderizado (eliminando zone.js donde sea posible) y reestructurar el código hacia una arquitectura limpia y modular.

2. Arquitectura y Formato de Diseño
   Arquitectura: Usaremos una arquitectura basada en características (Feature-driven architecture). El proyecto se dividirá estrictamente en Core (servicios singleton, interceptores, guards), Shared (UI components puros, pipes, directivas) y Features (dominios de negocio aislados con enrutamiento perezoso o lazy loading).
   Gestión de Estado: Para el estado local o de componentes, usaremos Angular Signals (introducido fuertemente en Angular 16+). Para el estado global complejo, usaremos NgRx SignalStore (la alternativa moderna, ligera y reactiva al antiguo NgRx Store).
   Componentes: Migraremos el 100% de la aplicación a Standalone Components, eliminando por completo los NgModules. Usaremos el nuevo Control Flow (@if, @for, @switch) en lugar de las directivas estructurales antiguas (*ngIf, *ngFor).
3. Mejores Prácticas, Patrones y Principios SOLID
   SOLID: Priorizar el Principio de Responsabilidad Única (SRP). Separaremos estrictamente los componentes en "Tontos" (Presentacionales), que solo reciben @Input() y emiten @Output(), y "Inteligentes" (Contenedores), que se comunican con los servicios y gestionan el estado.
   Inyección de Dependencias: Reemplazaremos la inyección clásica en el constructor por la función moderna inject(). Esto hace el código más limpio, facilita la herencia y permite escribir funciones reutilizables (componibles).
   Patrones: Usaremos el patrón Facade en los componentes inteligentes para delegar la lógica compleja de negocio y llamadas HTTP a los servicios, manteniendo los componentes delgados.
4. Pruebas (Testing)
   Unitarias: Migraremos de Karma/Jasmine (que ya está obsoleto en el ecosistema Angular moderno) a Jest o al nuevo Web Test Runner experimental de Angular. La meta es un 80% de cobertura mínima.
   E2E: Usaremos Playwright o Cypress para pruebas End-to-End, reemplazando cualquier rastro antiguo de Protractor.
   Regla para Antigravity: "Por cada nuevo servicio o componente refactorizado, DEBES crear o actualizar su archivo .spec.ts correspondiente garantizando que las pruebas pasen en verde."
5. Documentación y Logs
   Documentación: Usar el formato JSDoc para todos los métodos públicos, interfaces y servicios. Usaremos Compodoc para autogenerar la documentación del proyecto.
   Logs: Queda estrictamente prohibido el uso de console.log. Debes crear un LoggerService inyectable (usando la función inject()) que maneje niveles de severidad (info, warn, error). En desarrollo usará la consola, pero estará preparado para enviar logs a servicios como Sentry o Datadog en producción.
6. CI/CD y DevOps
   Pipeline: Genera un archivo YAML para GitHub Actions. El pipeline debe tener 3 etapas obligatorias en cada Pull Request:
   Ejecutar el linter estricto (ESLint) y formateo (Prettier).
   Ejecutar los tests unitarios (ng test).
   Construir el artefacto de producción (ng build --configuration production).
   Optimización: Asegúrate de que el build aproveche la compilación moderna de Esbuild/Vite (por defecto en Angular 18) para tiempos de construcción ultrarrápidos.
