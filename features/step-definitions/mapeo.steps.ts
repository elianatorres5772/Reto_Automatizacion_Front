import { DataTable, Then } from '@cucumber/cucumber'
import { containItemsWhereEachItem, Ensure, equals, includes, or } from '@serenity-js/assertions'
import { actorInTheSpotlight } from '@serenity-js/core'

import { FieldStatus, MappedField, MappedFields } from '../../src/screenplay/questions'

Then('el campo {string} queda en estado {string}', async (label: string, status: string) =>
    actorInTheSpotlight().attemptsTo(
        Ensure.that(MappedField.called(label).status(), equals(status)),
    ))

Then('el campo {string} propone revisar el equivalente {string}', async (label: string, equivalent: string) =>
    actorInTheSpotlight().attemptsTo(
        Ensure.that(MappedField.called(label).source(), includes(`Equivalente a revisar: ${ equivalent }`)),
    ))

Then('cada campo solicitado queda en uno de los estados:', async (table: DataTable) => {
    const [ first, ...others ] = table.raw().flat().map(status => equals(status))

    await actorInTheSpotlight().attemptsTo(
        Ensure.that(MappedFields.statuses(), containItemsWhereEachItem(or(first, ...others))),
    )
})

Then('cada campo completado indica el campo del maestro de donde proviene', async () =>
    actorInTheSpotlight().attemptsTo(
        Ensure.that(MappedFields.completedWithoutMasterSource(), equals([])),
    ))

Then('el campo {string} no tiene un valor respaldado', async (label: string) =>
    actorInTheSpotlight().attemptsTo(
        Ensure.that(MappedField.called(label).value(), equals('Pendiente: no existe un valor respaldado')),
        Ensure.that(MappedField.called(label).source(), equals('Sin fuente')),
    ))

Then('el campo {string} se completa con {string} desde el campo maestro {string}', async (label: string, value: string, masterField: string) =>
    actorInTheSpotlight().attemptsTo(
        Ensure.that(MappedField.called(label).status(), equals(FieldStatus.Filled)),
        Ensure.that(MappedField.called(label).value(), equals(value)),
        Ensure.that(MappedField.called(label).source(), includes(`Campo maestro: ${ masterField }`)),
    ))
