import { Task } from '@serenity-js/core'
import { Click } from '@serenity-js/web'

import { RequestCardUI, RequestInboxUI } from '../ui'
import { WaitForProcessing } from './WaitForProcessing'

export const SelectTheRequest = {
    from: (client: string) =>
        Task.where(`#actor selecciona la solicitud de ${ client }`,
            Click.on(RequestInboxUI.requestFrom(client)),
            WaitForProcessing.ofTheWorkflow(),
        ),
}

export const ReviewTheReceivedEmail = () =>
    Task.where(`#actor abre el correo recibido`,
        Click.on(RequestCardUI.emailSummary()),
    )
