import { By, PageElement, PageElements } from '@serenity-js/web'

const column = (index: number, description: string) =>
    PageElements.located(By.xpath(`//tbody[@id='supports']/tr/td[${ index }]`))
        .describedAs(description)

export const SupportsUI = {
    evaluationDate: () =>
        PageElement.located(By.id('evaluation-date'))
            .describedAs('fecha de evaluación de vigencias'),

    types: () => column(1, 'tipos de soporte'),
    files: () => column(2, 'archivos de soporte'),
    validUntil: () => column(3, 'vigencias de los soportes'),
    statuses: () => column(4, 'estados de los soportes'),

    statusOf: (type: string) =>
        PageElement.located(By.xpath(`//tbody[@id='supports']/tr[td[1][normalize-space()='${ type }']]/td[4]`))
            .describedAs(`estado del soporte "${ type }"`),
}
