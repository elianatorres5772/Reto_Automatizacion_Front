import { By, PageElement, PageElements } from '@serenity-js/web'

export const DocumentsUI = {
    downloadButtons: () =>
        PageElements.located(By.xpath(`//div[@id='downloads']/button`))
            .describedAs('documentos disponibles para descargar'),

    downloadButtonFor: (fileName: string) =>
        PageElement.located(By.xpath(`//div[@id='downloads']/button[normalize-space()='Descargar ${ fileName }']`))
            .describedAs(`botón para descargar ${ fileName }`),

    note: () =>
        PageElement.located(By.id('document-note'))
            .describedAs('nota sobre los documentos generados'),
}
