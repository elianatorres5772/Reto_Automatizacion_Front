import { Duration, Task, Wait } from '@serenity-js/core'
import { isEnabled, Text } from '@serenity-js/web'
import { Ensure, equals, isTrue } from '@serenity-js/assertions'

import { Hidden } from '../questions/Hidden'
import { AgentChatUI, WorkflowUI } from '../ui'

// Leer, mapear y generar documentos ocurre en el servidor y puede tardar si el servicio estaba inactivo.
const ProcessingTimeout = Duration.ofSeconds(120)

export const WaitForProcessing = {
    ofTheWorkflow: () =>
        Task.where(`#actor espera a que termine la preparación`,
            Wait.upTo(ProcessingTimeout).until(Hidden.of(WorkflowUI.processingIndicator()), isTrue()),
            // Si el servidor rechaza la acción (p. ej. sesión expirada) la pantalla no cambia;
            // se falla aquí con el mensaje de la aplicación en lugar de en una validación posterior.
            Ensure.that(Text.of(WorkflowUI.alert()), equals('')),
        ),

    ofTheAgent: () =>
        Task.where(`#actor espera la respuesta del agente`,
            Wait.upTo(ProcessingTimeout).until(Hidden.of(AgentChatUI.thinkingIndicator()), isTrue()),
            Wait.upTo(ProcessingTimeout).until(AgentChatUI.messageInput(), isEnabled()),
        ),
}
