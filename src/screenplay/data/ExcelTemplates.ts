import fs from 'node:fs'
import path from 'node:path'

export interface TemplateCell {
    etiqueta: string
    hoja: string
    celda_etiqueta: string
    celda_valor: string
}

export interface ExcelTemplate {
    cliente: string
    campos: TemplateCell[]
}

const TemplatesDirectory = path.resolve('fixtures', 'plantillas-celdas')

/**
 * Plantillas de celdas (plantilla-celdas.json) enviadas por cada cliente,
 * usadas como referencia esperada para validar el Excel generado.
 */
export const ExcelTemplates = {
    of: (client: string): ExcelTemplate => {
        const template = fs.readdirSync(TemplatesDirectory)
            .filter(file => file.endsWith('.json'))
            .map(file => JSON.parse(fs.readFileSync(path.join(TemplatesDirectory, file), 'utf8')) as ExcelTemplate)
            .find(candidate => candidate.cliente === client)

        if (!template) {
            throw new Error(`No hay plantilla de celdas registrada para el cliente "${ client }" en ${ TemplatesDirectory }`)
        }
        return template
    },
}
