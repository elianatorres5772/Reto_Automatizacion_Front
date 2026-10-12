import { Task } from '@serenity-js/core'
import { Click } from '@serenity-js/web'

import { PackageAuthorizationUI } from '../ui'
import { WaitForProcessing } from './WaitForProcessing'

export const RespondToPackageAuthorization = {
    approving: () =>
        Task.where(`#actor autoriza la preparación del paquete para firma`,
            Click.on(PackageAuthorizationUI.approveButton()),
            WaitForProcessing.ofTheWorkflow(),
        ),

    declining: () =>
        Task.where(`#actor cancela la preparación del paquete para firma`,
            Click.on(PackageAuthorizationUI.cancelButton()),
            WaitForProcessing.ofTheWorkflow(),
        ),
}
