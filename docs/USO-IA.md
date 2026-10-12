# Uso de IA en la automatización

Este proyecto se construyó con **Claude Code** (modelo Claude Opus 5.5, de Anthropic) como asistente de desarrollo, bajo la dirección de la analista de QA. Esta página describe qué hizo la IA, qué decidió la persona y cómo se verificó el resultado.

## Herramientas

| Herramienta | Uso |
|---|---|
| Claude Code (extensión de VS Code) | Análisis de las HU, exploración de la app, generación del código, ejecución de pruebas y diagnóstico de fallos |
| Skills propias del equipo (Serenity/JS + Screenplay) | Reglas de arquitectura, selectores, Gherkin y revisión que la IA siguió. **No se incluyen en este repositorio: se entregan por separado como parte del reto** |

Skills aplicadas: scaffold del framework, implementación de features, orquestación E2E y revisión de arquitectura Screenplay.

## Flujo de trabajo

1. **Rol y contexto.** Se le asignó a la IA el rol de Ingeniero de Automatización QA y se le entregaron las 5 HU con sus criterios de aceptación y la URL de la aplicación.
2. **Exploración.** La IA leyó el HTML y el JavaScript de la app y ejecutó el flujo por su API en los 4 casos (CO, EC, HN, PA) para conocer los resultados esperados: estados de campos, soportes, artefactos (XLSX, PDF, ZIP, MD) y respuestas del agente conversacional.
3. **Scaffold.** Se creó el framework con pnpm: TypeScript, Cucumber, Serenity/JS, Screenplay y Playwright sobre el Chrome local.
4. **Implementación.** Features en Gherkin en español (uno por HU) y capas Screenplay: UI, Tasks, Interactions y Questions.
5. **Ejecución y diagnóstico.** La suite se ejecutó varias veces. Cada fallo se clasificó como de automatización, de datos o de entorno antes de corregir nada.
6. **Revisión.** Se aplicó la skill de revisión de arquitectura y se corrigieron los hallazgos.
7. **Reportes.** Se añadió el reporte de Serenity BDD con fotos por interacción, a pedido de la analista.

## Decisiones humanas

- Elección del stack y de las convenciones (definidas en las skills).
- Uso de Playwright como motor de automatización de la UI.
- Uso del reporte de Serenity BDD con capturas, y del JRE portable en lugar de instalar Java en el sistema.
- Aprobación de cada paso relevante durante la sesión.

## Hallazgos durante el desarrollo

| Hallazgo | Clasificación | Resolución |
|---|---|---|
| Tras autorizar o cancelar el paquete se validaba antes de que terminara el proceso. `isVisible()` exige que el elemento esté en el viewport y el indicador quedaba fuera de pantalla. | Automatización | Nueva Question `Hidden`, que sincroniza con el atributo `hidden` de la app |
| El chat no reconocía `caso-inexistente` como identificador de caso | Datos de prueba | Se usó un identificador con el formato real (`xx-empresa-inexistente`) |
| Respuestas 401 y "Conexión interrumpida" intermitentes | Entorno (servidor gratuito en Render) | Guarda en `WaitForProcessing` que falla con el mensaje de la app. No se agregaron reintentos para no ocultar problemas |
| "sí" parecía cancelar la confirmación del chat durante la exploración | Falso positivo (codificación de la terminal) | Se descartó como defecto: en el navegador el flujo funciona y el escenario pasa |
| `pdf-parse` no leía el PDF 1.7 generado | Herramienta | Se reemplazó por `unpdf` |

## Verificación

- `pnpm lint:types`: TypeScript compila sin errores.
- `pnpm test`: 35 escenarios ejecutados contra la aplicación real, 35 exitosos.
- Validación del contenido real de los documentos descargados: celdas del XLSX contra la plantilla del cliente, texto y orden del PDF, archivos dentro del ZIP y checklist.

El código generado por la IA fue revisado y ejecutado. Ningún resultado se dio por bueno sin haber corrido las pruebas.
