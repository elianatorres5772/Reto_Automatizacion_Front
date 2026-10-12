import { By, PageElement } from '@serenity-js/web'

export const RequestInboxUI = {
    requestSelector: () =>
        PageElement.located(By.id('case'))
            .describedAs('selector de solicitudes recibidas'),

    // Las tarjetas de solicitud no tienen ID propio; se anclan al contenedor y al nombre visible del cliente.
    requestFrom: (client: string) =>
        PageElement.located(By.xpath(`//div[@id='case-list']/button[strong[normalize-space()='${ client }']]`))
            .describedAs(`solicitud de ${ client }`),
}
