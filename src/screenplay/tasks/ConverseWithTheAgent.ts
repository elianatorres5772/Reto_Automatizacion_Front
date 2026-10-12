import { Duration, Task, Wait } from '@serenity-js/core'
import { Attribute, Click, Enter, isEnabled, Select } from '@serenity-js/web'

import { AgentChatUI } from '../ui'
import { WaitForProcessing } from './WaitForProcessing'

export const OpenTheAgentChat = {
    forTheRequestOf: (client: string) =>
        Task.where(`#actor abre la conversación con el agente para ${ client }`,
            Click.on(AgentChatUI.openButton()),
            // El chat abre su propia sesión; el campo de mensaje se habilita cuando está listo.
            Wait.upTo(Duration.ofSeconds(90)).until(AgentChatUI.messageInput(), isEnabled()),
            Select.value(Attribute.called('value').of(AgentChatUI.caseOptionFor(client)))
                .from(AgentChatUI.caseSelector()),
        ),
}

export const AskTheAgent = {
    to: (message: string) =>
        Task.where(`#actor le pide al agente "${ message }"`,
            Enter.theValue(message).into(AgentChatUI.messageInput()),
            Click.on(AgentChatUI.sendButton()),
            WaitForProcessing.ofTheAgent(),
        ),
}

export const ConfirmTheAgentAction = () =>
    Task.where(`#actor confirma la acción solicitada por el agente`,
        Click.on(AgentChatUI.confirmButton()),
        WaitForProcessing.ofTheAgent(),
    )
