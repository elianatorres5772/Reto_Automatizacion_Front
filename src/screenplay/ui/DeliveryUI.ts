import { By, PageElement } from '@serenity-js/web'

export const DeliveryUI = {
    title: () =>
        PageElement.located(By.id('delivery-title'))
            .describedAs('resultado de la preparación del paquete'),

    summary: () =>
        PageElement.located(By.id('delivery-summary'))
            .describedAs('resumen de la entrega'),
}
