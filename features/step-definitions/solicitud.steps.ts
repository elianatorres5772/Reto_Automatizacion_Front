import { DataTable, Given, Then, When } from '@cucumber/cucumber'
import { Ensure, equals } from '@serenity-js/assertions'
import { Actor, actorInTheSpotlight } from '@serenity-js/core'

import { MappedFields, RequestDetails } from '../../src/screenplay/questions'
import { OpenThePortal, PrepareDocuments, ReviewTheReceivedEmail, SelectTheRequest } from '../../src/screenplay/tasks'

Given('que {actor} abre el portal de preparación documental', async (actor: Actor) =>
    actor.attemptsTo(
        OpenThePortal.forDocumentPreparation(),
    ))

When('selecciona la solicitud de {string}', async (client: string) =>
    actorInTheSpotlight().attemptsTo(
        SelectTheRequest.from(client),
        Ensure.that(RequestDetails.client(), equals(client)),
    ))

When('revisa el correo recibido', async () =>
    actorInTheSpotlight().attemptsTo(
        ReviewTheReceivedEmail(),
    ))

When('prepara los documentos de la solicitud', async () =>
    actorInTheSpotlight().attemptsTo(
        PrepareDocuments.forTheSelectedRequest(),
    ))

Then('la solicitud corresponde al país {string} con formato de salida {string}', async (country: string, format: string) =>
    actorInTheSpotlight().attemptsTo(
        Ensure.that(RequestDetails.country(), equals(country)),
        Ensure.that(RequestDetails.outputFormat(), equals(format)),
    ))

Then('los soportes exigidos son {string}', async (supports: string) =>
    actorInTheSpotlight().attemptsTo(
        Ensure.that(RequestDetails.requiredSupports(), equals(supports.split(',').map(support => support.trim()))),
    ))

Then('los campos solicitados son:', async (table: DataTable) =>
    actorInTheSpotlight().attemptsTo(
        Ensure.that(MappedFields.labels(), equals(table.hashes().map(row => row.campo))),
    ))
