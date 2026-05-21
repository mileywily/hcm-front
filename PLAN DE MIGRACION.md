PLAN DE MIGRACION 

CONTEXTO: 
Antigravity, mi proyecto está en C:\POSTULACIONES\hcm-front.
 He dejado un archivo llamado directrices-refactor.md en la raíz. Léelo, 
 analiza el código y genera el plan de implementación. me gustaria hacerlo por componentes del mas basico 
 al detalle que sea incremental para ir viendo y ejecutando las pruebas , probar un componente completo 
 para continuar con el segundo, y asi sucesivamente para ir viendo el detalle 

 He analizado el código del proyecto y las directrices de refactorización. He creado el plan de 
 implementación detallado en el artefacto correspondiente.

Puedes consultar el plan completo aquí: 
implementation_plan.md.

PROPUESTA
Temas clave que requieren tu decisión para iniciar:
Estrategia de actualización de versión (Angular 10 a 18):
Dado que el proyecto está en Angular 10 (según package.json) y queremos saltar a Angular 18 
(y componentes Standalone), el proceso con ng update de versión en versión (10 -> 11 -> 12... -> 18) 
puede ser sumamente inestable y generar conflictos de dependencias difíciles de resolver.
Recomendación: 
Crear un nuevo proyecto limpio con Angular 18 en el mismo directorio 
(o en una rama/carpeta limpia) y luego migrar, adaptar y refactorizar 
incrementalmente el código fuente componente por componente hacia esta nueva estructura limpia.

# 1️⃣ Linter
npm run lint -- --fix

# 2️⃣ Tests unitarios
npm test

# 3️⃣ Tests E2E
npm run e2e

# 4️⃣ Servir en dev
npm start   # o: ng serve

# 5️⃣ Build de producción
npm run build -- --configuration production

# 6️⃣ (Opcional) Ver reporte HTML de Playwright
npx playwright show-report   # abre playwri​ght-report/index.html

# 7️⃣ (Opcional) Ver CI localmente con act (si lo tienes)
act -j lint-test-build --reuse=false
