import { defineParameterType } from '@cucumber/cucumber'
import { actorCalled } from '@serenity-js/core'

defineParameterType({
    name: 'actor',
    regexp: /[A-ZÁÉÍÓÚÑ][a-záéíóúñ]+/,
    transformer: (name: string) => actorCalled(name),
})
