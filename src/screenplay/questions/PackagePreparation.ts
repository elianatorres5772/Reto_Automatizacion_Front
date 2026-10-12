import { Question } from '@serenity-js/core'
import { Text } from '@serenity-js/web'

import { DeliveryUI, DocumentsUI, PackageAuthorizationUI } from '../ui'
import { Hidden } from './Hidden'
import { SupportEvaluation } from './SupportEvaluation'

export const DeliveryOutcome = {
    ReadyForSignature: 'Paquete listo para revisión y firma',
    PendingSupports: 'Paquete generado con soportes pendientes',

    title: () => Text.of(DeliveryUI.title()),

    expectedFromSupports: () =>
        Question.about<string>('el resultado esperado según los soportes', async actor => {
            const blocking = await actor.answer(SupportEvaluation.blockingSupports())
            return blocking.length > 0 ? DeliveryOutcome.PendingSupports : DeliveryOutcome.ReadyForSignature
        }),
}

export const PackageAuthorization = {
    question: () => Text.of(PackageAuthorizationUI.question()),

    isPending: () =>
        Question.about<boolean>('si hay una autorización de paquete pendiente', async actor =>
            ! await actor.answer(Hidden.of(PackageAuthorizationUI.section())),
        ),
}

export const AvailableDownloads = {
    names: () =>
        Question.about<string[]>('los documentos disponibles para descargar', async actor => {
            const labels = await actor.answer(Text.ofAll(DocumentsUI.downloadButtons()))
            return labels.map(label => label.replace(/^Descargar\s+/, ''))
        }),

    note: () => Text.of(DocumentsUI.note()),
}
