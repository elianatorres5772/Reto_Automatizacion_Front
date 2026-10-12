import { Question } from '@serenity-js/core'
import { Text } from '@serenity-js/web'

import { SupportsUI } from '../ui'

export const SupportStatus = {
    Available: 'Disponible',
    Expired: 'Vencido',
    FileMissing: 'Archivo faltante',
    Absent: 'Ausente',
} as const

const BlockingStatuses: string[] = [ SupportStatus.Expired, SupportStatus.FileMissing, SupportStatus.Absent ]
const IsoDate = /^\d{4}-\d{2}-\d{2}$/

export interface SupportRow {
    type: string
    file: string
    validUntil: string
    status: string
}

export const SupportEvaluation = {
    statusOf: (type: string) => Text.of(SupportsUI.statusOf(type)),

    evaluationDate: () =>
        Question.about<string>('la fecha de evaluación de vigencias', async actor => {
            const text = await actor.answer(Text.of(SupportsUI.evaluationDate()))
            return text.replace('Evaluación UTC:', '').trim()
        }),

    rows: () =>
        Question.about<SupportRow[]>('los soportes exigidos evaluados', async actor => {
            const types = await actor.answer(Text.ofAll(SupportsUI.types()))
            const files = await actor.answer(Text.ofAll(SupportsUI.files()))
            const validUntil = await actor.answer(Text.ofAll(SupportsUI.validUntil()))
            const statuses = await actor.answer(Text.ofAll(SupportsUI.statuses()))

            return types.map((type, index) => ({
                type,
                file: files[index],
                validUntil: validUntil[index],
                status: statuses[index],
            }))
        }),

    blockingSupports: () =>
        Question.about<string[]>('los soportes vencidos, ausentes o sin archivo', async actor => {
            const rows = await actor.answer(SupportEvaluation.rows())
            return rows.filter(row => BlockingStatuses.includes(row.status)).map(row => row.type)
        }),

    expiredButNotFlagged: () =>
        Question.about<string[]>('los soportes con vigencia vencida no marcados como vencidos', async actor => {
            const evaluationDate = await actor.answer(SupportEvaluation.evaluationDate())
            const rows = await actor.answer(SupportEvaluation.rows())

            // Las fechas ISO (AAAA-MM-DD) se comparan correctamente como texto.
            return rows
                .filter(row => IsoDate.test(row.validUntil) && row.validUntil < evaluationDate)
                .filter(row => row.status !== SupportStatus.Expired)
                .map(row => `${ row.type } (vigencia ${ row.validUntil }, estado ${ row.status })`)
        }),
}
