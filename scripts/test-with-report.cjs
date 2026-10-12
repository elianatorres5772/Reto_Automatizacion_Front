/**
 * Ejecuta la suite y, pase o falle, genera el reporte de Serenity BDD.
 * Uso: pnpm test:report [argumentos de cucumber-js, p. ej. --tags @HU-1]
 * El código de salida es el de las pruebas.
 */
const { spawnSync } = require('node:child_process')
const fs = require('node:fs')
const path = require('node:path')

// Los JSON de ejecuciones anteriores se mezclarían en el reporte.
fs.rmSync(path.resolve('target', 'site', 'serenity'), { recursive: true, force: true })

const run = (script, args) => spawnSync(process.execPath, [ script, ...args ], { stdio: 'inherit' }).status ?? 1

const testsStatus = run(path.resolve('node_modules', '@cucumber', 'cucumber', 'bin', 'cucumber.js'), process.argv.slice(2))
const reportStatus = run(path.resolve('scripts', 'serenity-bdd.cjs'), [ 'run', '--features', './features', '--project', 'Registro como proveedor' ])

if (reportStatus === 0) {
    console.log(`\nReporte de Serenity BDD: ${ path.resolve('target', 'site', 'serenity', 'index.html') }`)
}
process.exit(testsStatus || reportStatus)
