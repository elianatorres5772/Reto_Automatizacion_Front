import { Question } from '@serenity-js/core'
import AdmZip from 'adm-zip'

import { readDownloaded } from './DownloadedDocuments'
import { SupportEvaluation, SupportStatus } from './SupportEvaluation'

export const DownloadedPackage = {
    entries: (fileName: string) =>
        Question.about<string[]>(`los archivos dentro de ${ fileName }`, async actor => {
            const zip = new AdmZip(await readDownloaded(actor, fileName))
            return zip.getEntries()
                .filter(entry => ! entry.isDirectory)
                .map(entry => entry.entryName)
        }),

    entry: (fileName: string, entryName: string) =>
        Question.about<string>(`el contenido de ${ entryName } en ${ fileName }`, async actor => {
            const zip = new AdmZip(await readDownloaded(actor, fileName))
            const entry = zip.getEntry(entryName)
            if (! entry) {
                throw new Error(`${ fileName } no contiene ${ entryName }`)
            }
            return entry.getData().toString('utf8')
        }),

    availableSupportsNotIncluded: (fileName: string) =>
        Question.about<string[]>(`los soportes disponibles que no están copiados en ${ fileName }`, async actor => {
            const entries = await actor.answer(DownloadedPackage.entries(fileName))
            const supports = await actor.answer(SupportEvaluation.rows())

            return supports
                .filter(support => support.status === SupportStatus.Available)
                .filter(support => ! entries.includes(`soportes/${ support.file }`))
                .map(support => `${ support.type } (${ support.file })`)
        }),
}
