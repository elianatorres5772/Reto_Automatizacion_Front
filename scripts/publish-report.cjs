/**
 * Publica el último reporte de Serenity BDD (target/site/serenity) en la rama gh-pages,
 * que GitHub Pages sirve en https://elianatorres5772.github.io/Reto_Automatizacion_Front/
 * Uso: pnpm test:report && pnpm report:publish
 */
const { execFileSync } = require('node:child_process')
const fs = require('node:fs')
const os = require('node:os')
const path = require('node:path')

const report = path.resolve('target', 'site', 'serenity')
if (! fs.existsSync(path.join(report, 'index.html'))) {
    console.error('No hay reporte en target/site/serenity. Ejecuta primero: pnpm test:report')
    process.exit(1)
}

const git = (args, cwd) => execFileSync('git', args, { cwd, stdio: 'inherit' })
const worktree = fs.mkdtempSync(path.join(os.tmpdir(), 'gh-pages-'))

try {
    git([ 'fetch', 'origin', 'gh-pages' ])
    git([ 'worktree', 'add', '-B', 'gh-pages', worktree, 'origin/gh-pages' ])

    // Reemplaza el contenido publicado por el reporte nuevo.
    for (const entry of fs.readdirSync(worktree)) {
        if (entry !== '.git') {
            fs.rmSync(path.join(worktree, entry), { recursive: true, force: true })
        }
    }
    fs.cpSync(report, worktree, { recursive: true })
    fs.writeFileSync(path.join(worktree, '.nojekyll'), '')

    git([ 'add', '-A' ], worktree)
    git([ 'commit', '-m', `Reporte Serenity BDD ${ new Date().toISOString().slice(0, 10) }` ], worktree)
    git([ 'push', 'origin', 'gh-pages' ], worktree)
}
finally {
    git([ 'worktree', 'remove', '--force', worktree ])
}
