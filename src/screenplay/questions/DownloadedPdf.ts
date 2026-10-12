import { Question } from '@serenity-js/core'
import { extractText, getDocumentProxy } from 'unpdf'

import { readDownloaded } from './DownloadedDocuments'
import { FieldStatus, MappedFields } from './MappedFields'

export const DownloadedPdf = {
    lines: (fileName: string) =>
        Question.about<string[]>(`las líneas de texto de ${ fileName }`, async actor => {
            const pdf = await getDocumentProxy(new Uint8Array(await readDownloaded(actor, fileName)))
            const { text } = await extractText(pdf, { mergePages: true })
            return text.split('\n').map(line => line.trim()).filter(Boolean)
        }),

    /**
     * Verifica que cada campo de la revisión aparezca como "Etiqueta: valor" y en el mismo orden.
     * Para un dato faltante solo se exige la etiqueta, nunca un valor inventado del maestro.
     */
    fieldsNotReproducedInOrder: (fileName: string) =>
        Question.about<string[]>(`los campos que ${ fileName } no reproduce en orden`, async actor => {
            const lines = await actor.answer(DownloadedPdf.lines(fileName))
            const fields = await actor.answer(MappedFields.rows())

            const problems: string[] = []
            let previous = -1
            for (const field of fields) {
                const index = lines.findIndex((line, position) => position > previous && line.startsWith(`${ field.label }:`))
                if (index === -1) {
                    problems.push(`"${ field.label }" no aparece después del campo anterior`)
                    continue
                }
                if (field.status !== FieldStatus.Missing && lines[index] !== `${ field.label }: ${ field.value }`) {
                    problems.push(`se esperaba "${ field.label }: ${ field.value }" y aparece "${ lines[index] }"`)
                }
                previous = index
            }
            return problems
        }),
}
