import { Question } from '@serenity-js/core'
import { Text } from '@serenity-js/web'

import { FieldsReviewUI } from '../ui'

export const FieldStatus = {
    Filled: 'Completado',
    Missing: 'Dato faltante',
    NeedsConfirmation: 'Revisión humana',
} as const

export interface MappedFieldRow {
    label: string
    value: string
    status: string
    source: string
}

export const MappedFields = {
    labels: () => Text.ofAll(FieldsReviewUI.labels()),

    statuses: () => Text.ofAll(FieldsReviewUI.statuses()),

    rows: () =>
        Question.about<MappedFieldRow[]>('los campos mapeados desde el maestro', async actor => {
            const labels = await actor.answer(Text.ofAll(FieldsReviewUI.labels()))
            const values = await actor.answer(Text.ofAll(FieldsReviewUI.values()))
            const statuses = await actor.answer(Text.ofAll(FieldsReviewUI.statuses()))
            const sources = await actor.answer(Text.ofAll(FieldsReviewUI.sources()))

            return labels.map((label, index) => ({
                label,
                value: values[index],
                status: statuses[index],
                source: sources[index],
            }))
        }),

    completedWithoutMasterSource: () =>
        Question.about<string[]>('los campos completados sin campo maestro de origen', async actor => {
            const rows = await actor.answer(MappedFields.rows())
            return rows
                .filter(row => row.status === FieldStatus.Filled && ! row.source.includes('Campo maestro:'))
                .map(row => row.label)
        }),
}

export const MappedField = {
    called: (label: string) => ({
        value: () => Text.of(FieldsReviewUI.valueOf(label)),
        status: () => Text.of(FieldsReviewUI.statusOf(label)),
        source: () => Text.of(FieldsReviewUI.sourceOf(label)),
    }),
}
