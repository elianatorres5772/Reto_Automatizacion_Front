import { Question } from '@serenity-js/core'
import ExcelJS from 'exceljs'

import { ExcelTemplate } from '../data/ExcelTemplates'
import { readDownloaded } from './DownloadedDocuments'
import { FieldStatus, MappedFields } from './MappedFields'

export const DownloadedWorkbook = {
    /**
     * Compara cada etiqueta y valor del Excel con la celda indicada por la plantilla del cliente.
     * El valor esperado es el que muestra la revisión de campos; un dato faltante debe quedar vacío.
     */
    cellsNotMatchingTemplate: (fileName: string, template: ExcelTemplate) =>
        Question.about<string[]>(`las celdas de ${ fileName } que no coinciden con la plantilla`, async actor => {
            const workbook = new ExcelJS.Workbook()
            await workbook.xlsx.load(await readDownloaded(actor, fileName) as unknown as ArrayBuffer)
            const fields = await actor.answer(MappedFields.rows())

            const problems: string[] = []
            for (const cell of template.campos) {
                const sheet = workbook.getWorksheet(cell.hoja)
                if (! sheet) {
                    problems.push(`no existe la hoja "${ cell.hoja }"`)
                    continue
                }

                const field = fields.find(row => row.label === cell.etiqueta)
                if (! field) {
                    problems.push(`"${ cell.etiqueta }" no aparece en la revisión de campos`)
                    continue
                }

                const expectedValue = field.status === FieldStatus.Missing ? '' : field.value
                const actualLabel = sheet.getCell(cell.celda_etiqueta).text.trim()
                const actualValue = sheet.getCell(cell.celda_valor).text.trim()

                if (actualLabel !== cell.etiqueta) {
                    problems.push(`${ cell.hoja }!${ cell.celda_etiqueta }: se esperaba "${ cell.etiqueta }" y contiene "${ actualLabel }"`)
                }
                if (actualValue !== expectedValue) {
                    problems.push(`${ cell.hoja }!${ cell.celda_valor }: se esperaba "${ expectedValue }" y contiene "${ actualValue }"`)
                }
            }
            return problems
        }),
}
