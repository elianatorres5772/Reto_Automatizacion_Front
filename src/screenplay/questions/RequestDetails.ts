import { Question } from '@serenity-js/core'
import { Text } from '@serenity-js/web'

import { RequestCardUI } from '../ui'

const RequiredSupportsPrefix = 'Soportes exigidos:'

export const RequestDetails = {
    client: () => Text.of(RequestCardUI.title()),

    country: () => Text.of(RequestCardUI.metadataValue('País del cliente')),

    outputFormat: () => Text.of(RequestCardUI.format()),

    requiredSupports: () =>
        Question.about<string[]>('los soportes exigidos en la solicitud', async actor => {
            const text = await actor.answer(Text.of(RequestCardUI.requiredSupports()))
            return text.replace(RequiredSupportsPrefix, '')
                .split(',')
                .map(support => support.trim())
                .filter(Boolean)
        }),
}
