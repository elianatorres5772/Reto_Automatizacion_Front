import { Then, When } from '@cucumber/cucumber'
import { Ensure, equals, isFalse, startsWith } from '@serenity-js/assertions'
import { actorInTheSpotlight } from '@serenity-js/core'

import { ExcelTemplates } from '../../src/screenplay/data/ExcelTemplates'
import {
    AvailableDownloads,
    DownloadedPdf,
    DownloadedPortalValues,
    DownloadedWorkbook,
    PackageAuthorization,
} from '../../src/screenplay/questions'
import { DownloadDocument } from '../../src/screenplay/tasks'

When('descarga el documento {string}', async (fileName: string) =>
    actorInTheSpotlight().attemptsTo(
        DownloadDocument.called(fileName),
    ))

Then('el formulario Excel {string} ubica cada etiqueta y su valor en la celda indicada por la plantilla de {string}', async (fileName: string, client: string) =>
    actorInTheSpotlight().attemptsTo(
        Ensure.that(DownloadedWorkbook.cellsNotMatchingTemplate(fileName, ExcelTemplates.of(client)), equals([])),
    ))

Then('el formulario PDF {string} reproduce todos los campos con su etiqueta y valor en el orden solicitado', async (fileName: string) =>
    actorInTheSpotlight().attemptsTo(
        Ensure.that(DownloadedPdf.fieldsNotReproducedInOrder(fileName), equals([])),
    ))

Then('se informa que el formato portal web no está soportado', async () =>
    actorInTheSpotlight().attemptsTo(
        Ensure.that(AvailableDownloads.note(), startsWith('Formato no soportado: portal web')),
    ))

Then('no se solicita autorización para armar el paquete', async () =>
    actorInTheSpotlight().attemptsTo(
        Ensure.that(PackageAuthorization.isPending(), isFalse()),
    ))

Then('el archivo {string} contiene todos los campos con su valor listos para copiar', async (fileName: string) =>
    actorInTheSpotlight().attemptsTo(
        Ensure.that(DownloadedPortalValues.content(fileName), startsWith('# Formato no soportado: portal web')),
        Ensure.that(DownloadedPortalValues.fieldsNotListed(fileName), equals([])),
    ))
