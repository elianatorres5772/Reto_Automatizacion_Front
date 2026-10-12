import { By, PageElement } from '@serenity-js/web'

export const PackageAuthorizationUI = {
    section: () =>
        PageElement.located(By.id('confirmation'))
            .describedAs('solicitud de autorización del paquete'),

    question: () =>
        PageElement.located(By.id('question'))
            .describedAs('pregunta de confirmación'),

    approveButton: () =>
        PageElement.located(By.id('approve'))
            .describedAs('botón Sí, preparar paquete'),

    cancelButton: () =>
        PageElement.located(By.id('cancel'))
            .describedAs('botón Cancelar preparación del paquete'),
}
