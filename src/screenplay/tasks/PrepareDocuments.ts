import { Task } from '@serenity-js/core'
import { Click } from '@serenity-js/web'

import { RequestCardUI } from '../ui'
import { WaitForProcessing } from './WaitForProcessing'

export const PrepareDocuments = {
    forTheSelectedRequest: () =>
        Task.where(`#actor prepara los documentos de la solicitud`,
            Click.on(RequestCardUI.prepareButton()),
            WaitForProcessing.ofTheWorkflow(),
        ),
}
