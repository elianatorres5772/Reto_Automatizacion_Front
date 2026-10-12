/**
 * Invoca la CLI de Serenity BDD usando el JRE portable de .tools/jre cuando existe;
 * si no, usa el Java del sistema (JAVA_HOME o PATH).
 * Uso: node scripts/serenity-bdd.cjs <update|run> [opciones]
 */
const { spawnSync } = require('node:child_process')
const fs = require('node:fs')
const path = require('node:path')

const env = { ...process.env }
const portableJre = path.resolve('.tools', 'jre')

if (fs.existsSync(path.join(portableJre, 'bin'))) {
    env.JAVA_HOME = portableJre
    env.PATH = `${ path.join(portableJre, 'bin') }${ path.delimiter }${ env.PATH }`
}

const cli = path.resolve('node_modules', '@serenity-js', 'serenity-bdd', 'bin', 'serenity-bdd')
const result = spawnSync(process.execPath, [ cli, ...process.argv.slice(2) ], { stdio: 'inherit', env })
process.exit(result.status ?? 1)
