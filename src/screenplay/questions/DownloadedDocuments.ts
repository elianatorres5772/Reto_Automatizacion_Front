import fs from 'node:fs/promises'

import { AnswersQuestions, notes } from '@serenity-js/core'

/** Libreta del actor: nombre del documento descargado -> ruta local donde se guardó. */
export type DownloadedDocuments = Record<string, string>

export const DownloadedDocument = {
    pathOf: (fileName: string) => notes<DownloadedDocuments>().get(fileName),
}

export async function readDownloaded(actor: AnswersQuestions, fileName: string): Promise<Buffer> {
    const filePath = await actor.answer(DownloadedDocument.pathOf(fileName))
    return fs.readFile(filePath)
}
