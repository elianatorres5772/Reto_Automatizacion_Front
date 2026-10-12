import { Task, Wait } from '@serenity-js/core'
import { isEnabled } from '@serenity-js/web'

import { SaveDownload } from '../interactions/SaveDownload'
import { DocumentsUI } from '../ui'

export const DownloadDocument = {
    called: (fileName: string) =>
        Task.where(`#actor descarga el documento ${ fileName }`,
            Wait.until(DocumentsUI.downloadButtonFor(fileName), isEnabled()),
            SaveDownload.of(fileName, DocumentsUI.downloadButtonFor(fileName)),
        ),
}
