import { By, PageElement } from '@serenity-js/web'

export const WorkflowUI = {
    processingIndicator: () =>
        PageElement.located(By.id('thinking'))
            .describedAs('indicador de procesamiento'),

    alert: () =>
        PageElement.located(By.id('alert'))
            .describedAs('mensaje de alerta'),
}
