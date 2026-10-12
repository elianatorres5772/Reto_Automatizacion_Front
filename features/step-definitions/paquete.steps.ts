import { DataTable, Then, When } from '@cucumber/cucumber'
import { contain, Ensure, equals, includes, isPresent, not } from '@serenity-js/assertions'
import { actorInTheSpotlight } from '@serenity-js/core'

import {
    AvailableDownloads,
    DeliveryOutcome,
    DownloadedPackage,
    PackageAuthorization,
    SupportEvaluation,
} from '../../src/screenplay/questions'
import { RespondToPackageAuthorization } from '../../src/screenplay/tasks'

Then('se solicita confirmación con la pregunta {string}', async (question: string) =>
    actorInTheSpotlight().attemptsTo(
        Ensure.that(PackageAuthorization.question(), equals(question)),
    ))

Then('el documento {string} todavía no está disponible para descargar', async (fileName: string) =>
    actorInTheSpotlight().attemptsTo(
        Ensure.that(AvailableDownloads.names(), not(contain(fileName))),
    ))

When('autoriza la preparación del paquete', async () =>
    actorInTheSpotlight().attemptsTo(
        RespondToPackageAuthorization.approving(),
    ))

When('cancela la preparación del paquete', async () =>
    actorInTheSpotlight().attemptsTo(
        RespondToPackageAuthorization.declining(),
    ))

Then('el resultado de la preparación es {string}', async (outcome: string) =>
    actorInTheSpotlight().attemptsTo(
        Ensure.that(DeliveryOutcome.title(), equals(outcome)),
    ))

Then('el paquete {string} contiene:', async (fileName: string, table: DataTable) =>
    actorInTheSpotlight().attemptsTo(
        ...table.hashes().map(row =>
            Ensure.that(DownloadedPackage.entries(fileName), contain(row.archivo)),
        ),
    ))

Then('el paquete {string} incluye una copia de cada soporte disponible', async (fileName: string) =>
    actorInTheSpotlight().attemptsTo(
        Ensure.that(DownloadedPackage.availableSupportsNotIncluded(fileName), equals([])),
    ))

Then('el checklist del paquete {string} indica {string}', async (fileName: string, text: string) =>
    actorInTheSpotlight().attemptsTo(
        Ensure.that(DownloadedPackage.entry(fileName, 'checklist.md'), includes(text)),
    ))

Then('el soporte {string} figura como {string}', async (type: string, status: string) =>
    actorInTheSpotlight().attemptsTo(
        Ensure.that(SupportEvaluation.statusOf(type), equals(status)),
    ))

Then('ningún soporte con vigencia anterior a la fecha de evaluación figura como disponible', async () =>
    actorInTheSpotlight().attemptsTo(
        Ensure.that(SupportEvaluation.evaluationDate(), isPresent()),
        Ensure.that(SupportEvaluation.expiredButNotFlagged(), equals([])),
    ))

Then('el paquete solo queda listo para firma si no hay soportes vencidos ni ausentes', async () =>
    actorInTheSpotlight().attemptsTo(
        Ensure.that(DeliveryOutcome.title(), equals(DeliveryOutcome.expectedFromSupports())),
    ))
