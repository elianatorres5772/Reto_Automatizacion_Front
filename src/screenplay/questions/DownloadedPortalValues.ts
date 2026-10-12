import { Question } from '@serenity-js/core'

import { readDownloaded } from './DownloadedDocuments'
import { FieldStatus, MappedFields } from './MappedFields'

export const DownloadedPortalValues = {
    content: (fileName: string) =>
        Question.about<string>(`el contenido de ${ fileName }`, async actor =>
            (await readDownloaded(actor, fileName)).toString('utf8'),
        ),

    /** Campos de la revisión que no figuran en la tabla del archivo con su etiqueta y valor. */
    fieldsNotListed: (fileName: string) =>
        Question.about<string[]>(`los campos que faltan en ${ fileName }`, async actor => {
            const content = await actor.answer(DownloadedPortalValues.content(fileName))
            const fields = await actor.answer(MappedFields.rows())

            return fields
                .filter(field => {
                    const expectedRow = field.status === FieldStatus.Missing
                        ? `| ${ field.label } |`
                        : `| ${ field.label } | ${ field.value } |`
                    return ! content.includes(expectedRow)
                })
                .map(field => field.label)
        }),
}
