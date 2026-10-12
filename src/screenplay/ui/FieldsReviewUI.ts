import { By, PageElement, PageElements } from '@serenity-js/web'

const rowFor = (label: string) => `//tbody[@id='fields']/tr[td[1][normalize-space()='${ label }']]`

export const FieldsReviewUI = {
    labels: () =>
        PageElements.located(By.xpath(`//tbody[@id='fields']/tr/td[1]`))
            .describedAs('campos solicitados'),

    values: () =>
        PageElements.located(By.xpath(`//tbody[@id='fields']/tr/td[2]`))
            .describedAs('valores del maestro'),

    statuses: () =>
        PageElements.located(By.xpath(`//tbody[@id='fields']/tr/td[3]`))
            .describedAs('estados de los campos'),

    sources: () =>
        PageElements.located(By.xpath(`//tbody[@id='fields']/tr/td[4]`))
            .describedAs('fuentes de los campos'),

    valueOf: (label: string) =>
        PageElement.located(By.xpath(`${ rowFor(label) }/td[2]`))
            .describedAs(`valor del campo "${ label }"`),

    statusOf: (label: string) =>
        PageElement.located(By.xpath(`${ rowFor(label) }/td[3]`))
            .describedAs(`estado del campo "${ label }"`),

    sourceOf: (label: string) =>
        PageElement.located(By.xpath(`${ rowFor(label) }/td[4]`))
            .describedAs(`fuente del campo "${ label }"`),
}
