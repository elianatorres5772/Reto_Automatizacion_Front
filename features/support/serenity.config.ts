import 'dotenv/config'

import path from 'node:path'

import { AfterAll, BeforeAll, setDefaultTimeout } from '@cucumber/cucumber'
import { ConsoleReporter } from '@serenity-js/console-reporter'
import { ArtifactArchiver, configure, Duration, StageCrewMember, StageCrewMemberBuilder } from '@serenity-js/core'
import { SerenityBDDReporter } from '@serenity-js/serenity-bdd'
import { Photographer, TakePhotosOfFailures, TakePhotosOfInteractions } from '@serenity-js/web'
import * as playwright from 'playwright'

import { Analysts } from './Analysts'

setDefaultTimeout(Duration.ofMinutes(5).inMilliseconds())


function photographer(): Array<StageCrewMember | StageCrewMemberBuilder> {
    switch (process.env.SCREENSHOTS ?? 'every-step') {
        case 'off':
            return []
        case 'failures':
            return [ Photographer.whoWill(TakePhotosOfFailures) ]
        default:
            return [ Photographer.whoWill(TakePhotosOfInteractions) ]
    }
}

let browser: playwright.Browser

BeforeAll(async () => {
    const baseURL = process.env.BASE_URL
    if (!baseURL) {
        throw new Error('Define BASE_URL en el archivo .env (consulta .env.example)')
    }

    browser = await playwright.chromium.launch({
        channel: 'chrome',
        headless: process.env.HEADLESS !== 'false',
    })

    configure({
        actors: new Analysts(browser, { baseURL }),
        crew: [
            ArtifactArchiver.storingArtifactsAt(path.resolve('target/site/serenity')),
            SerenityBDDReporter.fromJSON({ specDirectory: 'features' }),
            ...photographer(),
            ConsoleReporter.withDefaultColourSupport(),
        ],
    })
})

AfterAll(async () => {
    await browser?.close()
})
