import { Then, When } from '@cucumber/cucumber'
import {
    containAtLeastOneItemThat,
    containItemsWhereEachItem,
    Ensure,
    equals,
    includes,
    isTrue,
    matches,
    not,
    or,
    startsWith,
} from '@serenity-js/assertions'
import { actorInTheSpotlight } from '@serenity-js/core'

import { AgentConversation, AgentToolResults } from '../../src/screenplay/questions'
import { AskTheAgent, ConfirmTheAgentAction, OpenTheAgentChat } from '../../src/screenplay/tasks'

const RawTrace = /(\b\w*Error:|\bat\s+\S+\s+\(.*:\d+:\d+\)|Traceback|Exception)/

When('abre la conversación con el agente para la solicitud de {string}', async (client: string) =>
    actorInTheSpotlight().attemptsTo(
        OpenTheAgentChat.forTheRequestOf(client),
    ))

When('le pide al agente {string}', async (message: string) =>
    actorInTheSpotlight().attemptsTo(
        AskTheAgent.to(message),
    ))

When('confirma la acción solicitada por el agente', async () =>
    actorInTheSpotlight().attemptsTo(
        ConfirmTheAgentAction(),
    ))

Then('el agente solicita confirmación antes de continuar', async () =>
    actorInTheSpotlight().attemptsTo(
        Ensure.that(AgentConversation.isAwaitingConfirmation(), isTrue()),
        Ensure.that(AgentConversation.confirmationQuestion(), startsWith('¿Confirmas')),
    ))

Then('el agente registra el envío simulado en {string}', async (fileName: string) =>
    actorInTheSpotlight().attemptsTo(
        Ensure.that(AgentToolResults.summaries(), containAtLeastOneItemThat(includes(fileName))),
    ))

Then('cada herramienta ejecutada responde con un resultado controlado', async () =>
    actorInTheSpotlight().attemptsTo(
        Ensure.that(AgentToolResults.outcomes(), not(equals([]))),
        Ensure.that(AgentToolResults.outcomes(), containItemsWhereEachItem(or(equals('true'), equals('false')))),
    ))

Then('la herramienta {string} responde {string}', async (toolName: string, outcome: string) =>
    actorInTheSpotlight().attemptsTo(
        Ensure.that(AgentToolResults.lastSummaryOf(toolName), startsWith(`🔧 ${ toolName } · ${ outcome }`)),
    ))

Then('el agente responde {string}', async (text: string) =>
    actorInTheSpotlight().attemptsTo(
        Ensure.that(AgentConversation.messages(), containAtLeastOneItemThat(includes(text))),
    ))

Then('ninguna respuesta del agente expone trazas técnicas', async () =>
    actorInTheSpotlight().attemptsTo(
        Ensure.that(AgentConversation.messages(), containItemsWhereEachItem(not(matches(RawTrace)))),
    ))
