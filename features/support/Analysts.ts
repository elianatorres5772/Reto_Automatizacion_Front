import { Actor, Cast, TakeNotes } from '@serenity-js/core'
import { BrowseTheWebWithPlaywright } from '@serenity-js/playwright'
import * as playwright from 'playwright'


export class Analysts implements Cast {
    constructor(
        private readonly browser: playwright.Browser,
        private readonly contextOptions: playwright.BrowserContextOptions,
    ) {
    }

    prepare(actor: Actor): Actor {
        return actor.whoCan(
            BrowseTheWebWithPlaywright.using(
                this.browser,
                { acceptDownloads: true, ...this.contextOptions },
                { defaultNavigationTimeout: 90_000, defaultTimeout: 30_000 },
            ),
            TakeNotes.usingAnEmptyNotepad(),
        )
    }
}
