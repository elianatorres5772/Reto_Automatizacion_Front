import { By, PageElement } from '@serenity-js/web'

export const RequestCardUI = {
    title: () =>
        PageElement.located(By.id('request-title'))
            .describedAs('título de la solicitud'),

    format: () =>
        PageElement.located(By.id('format'))
            .describedAs('formato de salida solicitado'),

    metadataValue: (label: string) =>
        PageElement.located(By.xpath(`//dl[@id='request-meta']/div[dt[normalize-space()='${ label }']]/dd`))
            .describedAs(`dato "${ label }" de la solicitud`),

    emailSummary: () =>
        PageElement.located(By.xpath(`//details[@id='email']/summary`))
            .describedAs('enlace para ver el correo recibido'),

    requiredSupports: () =>
        PageElement.located(By.id('required-supports'))
            .describedAs('soportes exigidos por el cliente'),

    prepareButton: () =>
        PageElement.located(By.id('prepare'))
            .describedAs('botón Preparar documentos'),
}
