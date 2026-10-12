import { Duration, Task, Wait } from '@serenity-js/core'
import { isEnabled, Navigate } from '@serenity-js/web'

import { RequestInboxUI } from '../ui'

export const OpenThePortal = {
    forDocumentPreparation: () =>
        Task.where(`#actor abre el portal de preparación documental`,
            Navigate.to('/'),
            // El selector se habilita cuando la sesión y las solicitudes ya cargaron.
            Wait.upTo(Duration.ofSeconds(90)).until(RequestInboxUI.requestSelector(), isEnabled()),
        ),
}
