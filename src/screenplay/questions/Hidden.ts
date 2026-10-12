import { Answerable, d, Question } from '@serenity-js/core'
import { Attribute, PageElement } from '@serenity-js/web'

/**
 * Indica si la aplicación ocultó el elemento con el atributo `hidden`.
 * A diferencia de `isVisible()`, no depende de que el elemento esté dentro del viewport,
 * por lo que sirve para indicadores de progreso que pueden quedar fuera de pantalla.
 */
export const Hidden = {
    of: (element: Answerable<PageElement>) =>
        Question.about<boolean>(d`whether ${ element } is hidden`, async actor => {
            const hidden = await actor.answer(Attribute.called('hidden').of(element))
            return hidden !== null && hidden !== undefined
        }),
}
