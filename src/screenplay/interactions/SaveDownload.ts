import { randomUUID } from 'node:crypto'
import path from 'node:path'

import { Answerable, Interaction, notes } from '@serenity-js/core'
import { BrowseTheWebWithPlaywright, PlaywrightPage } from '@serenity-js/playwright'
import { Click, PageElement } from '@serenity-js/web'

import { DownloadedDocuments } from '../questions/DownloadedDocuments'

const DownloadsDirectory = path.resolve('target', 'downloads')

/**
 * Hace clic en un control de descarga, guarda el archivo recibido y anota su ruta
 * en la libreta del actor para que las Questions puedan inspeccionarlo.
 */
export const SaveDownload = {
    of: (fileName: string, trigger: Answerable<PageElement>) =>
        Interaction.where(`#actor descarga ${ fileName }`, async actor => {
            const page = await BrowseTheWebWithPlaywright.as(actor).currentPage() as PlaywrightPage
            const nativePage = await page.nativePage()

            const [ download ] = await Promise.all([
                nativePage.waitForEvent('download'),
                Click.on(trigger).performAs(actor),
            ])

            const target = path.join(DownloadsDirectory, randomUUID(), fileName)
            await download.saveAs(target)

            await notes<DownloadedDocuments>().set(fileName, target).performAs(actor)
        }),
}
