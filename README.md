# Automatización · Registro como proveedor

Pruebas E2E de la aplicación de preparación documental
(`https://registro-proveedor-cvqp.onrender.com`) con **Serenity/JS + Screenplay + Cucumber + Playwright** sobre el Chrome local.

## Ejecución

```bash
pnpm install
cp .env.example .env          # BASE_URL y HEADLESS
pnpm test                     # suite completa
pnpm test:smoke               # escenarios @smoke
pnpm test:hu @HU-3            # una historia de usuario
pnpm test:headed              # con el navegador visible
pnpm exec cucumber-js features/hu4-paquete-firma.feature:11   # un escenario
pnpm lint:types               # validación de TypeScript
```

## Reporte de Serenity BDD

```bash
pnpm test:report              # ejecuta la suite y genera el reporte (acepta filtros: pnpm test:report --tags @HU-4)
pnpm report:serenity          # regenera el reporte con los resultados de la última ejecución
pnpm report:open              # abre target/site/serenity/index.html
```

- Incluye requisitos por feature, escenarios con sus Ejemplos, cada Task e Interaction y las fotos de la página.
- Fotos: `SCREENSHOTS=every-step` (una por interacción, por defecto), `failures` u `off` en `.env`.
- La CLI de Serenity BDD necesita Java 17+. Se usa el JRE portable de `.tools/jre` (Temurin 21, ignorado por git) y, si no existe, el Java del sistema. En otra máquina: descarga un JRE en `.tools/jre` o instala Java.
- Otros artefactos: `target/cucumber-report.html` (reporte simple de Cucumber) y `target/downloads` (documentos descargados).

## Cobertura por historia

| HU | Feature | Qué se valida |
|----|---------|---------------|
| HU-1 | `hu1-leer-solicitud.feature` | País, formato y soportes exigidos de los 4 casos; lista de campos; identificación tributaria ambigua → *Revisión humana* con el equivalente del país (RUC EC/PA, RTN HN) y NIT de Colombia completado |
| HU-2 | `hu2-mapear-campos.feature` | Cada campo termina en *Completado* / *Dato faltante* / *Revisión humana*; trazabilidad al campo maestro; faltantes sin valor inventado; sinónimos del glosario |
| HU-3 | `hu3-generar-formulario.feature` | P0: celdas del XLSX contra `fixtures/plantillas-celdas`; P1: texto del PDF en orden; P2: portal no soportado y `valores-portal.md` |
| HU-4 | `hu4-paquete-firma.feature` | Pregunta explícita de confirmación; contenido del ZIP (formulario, checklist, borrador, soportes); soporte ausente; vigencias vs. fecha de evaluación; cancelación; envío simulado vía chat |
| HU-5 | `hu5-manejo-errores.feature` | Cada herramienta del agente responde `ok` / `error controlado`; caso inexistente y formato no soportado sin trazas técnicas |

## Estructura

```
features/                 *.feature (Gherkin en español), step-definitions/, support/
src/screenplay/
  ui/                     selectores (ID estable o XPath relativo anclado a un ID)
  tasks/                  acciones de negocio (seleccionar, preparar, autorizar, conversar)
  interactions/           SaveDownload: captura una descarga del navegador
  questions/              estado de pantalla y contenido de XLSX / PDF / ZIP / MD descargados
  data/                   cargador de plantillas de celdas
fixtures/plantillas-celdas/   plantilla-celdas.json de cada cliente Excel
```

## Notas

- La sincronización usa el atributo `hidden` de los indicadores de progreso (`Hidden.of`): `isVisible()` exige que el elemento esté en el viewport y daba falsos "terminado" al hacer clic al final de la página.
- Tras cada acción del flujo se verifica que la app no muestre alertas (p. ej. *sesión expirada* o *conexión interrumpida*) para que el fallo indique la causa real.
- El servidor está en un plan gratuito de Render: si estuvo inactivo puede tardar en responder.

## Uso de IA

Este proyecto se desarrolló con apoyo de Claude Code. El proceso, las decisiones y la verificación están documentados en [docs/USO-IA.md](docs/USO-IA.md).
