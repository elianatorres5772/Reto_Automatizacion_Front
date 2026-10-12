import { Question } from '@serenity-js/core'
import { Attribute, Text } from '@serenity-js/web'

import { AgentChatUI } from '../ui'
import { Hidden } from './Hidden'

export const AgentConversation = {
    messages: () => Text.ofAll(AgentChatUI.agentMessages()),

    confirmationQuestion: () => Text.of(AgentChatUI.confirmationQuestion()),

    isAwaitingConfirmation: () =>
        Question.about<boolean>('si el agente espera una confirmación', async actor =>
            ! await actor.answer(Hidden.of(AgentChatUI.confirmation())),
        ),
}

export const AgentToolResults = {
    /** "true" / "false" según el contrato { ok, data } | { ok: false, error } de cada herramienta. */
    outcomes: () => AgentChatUI.toolCards().eachMappedTo(Attribute.called('data-ok')),

    summaries: () => Text.ofAll(AgentChatUI.toolSummaries()),

    lastSummaryOf: (toolName: string) => Text.of(AgentChatUI.lastToolSummaryFor(toolName)),
}
