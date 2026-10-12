import { By, PageElement, PageElements } from '@serenity-js/web'

export const AgentChatUI = {
    openButton: () =>
        PageElement.located(By.id('chat-open'))
            .describedAs('botón Conversar con el agente'),

    caseSelector: () =>
        PageElement.located(By.id('chat-case'))
            .describedAs('selector del caso activo en el chat'),

    caseOptionFor: (client: string) =>
        PageElement.located(By.xpath(`//select[@id='chat-case']/option[starts-with(normalize-space(),'${ client } ·')]`))
            .describedAs(`caso de ${ client } en el chat`),

    messageInput: () =>
        PageElement.located(By.id('chat-message'))
            .describedAs('mensaje para el agente'),

    sendButton: () =>
        PageElement.located(By.xpath(`//form[@id='chat-form']//button[@type='submit']`))
            .describedAs('botón Enviar del chat'),

    thinkingIndicator: () =>
        PageElement.located(By.id('chat-thinking'))
            .describedAs('indicador de que el agente está pensando'),

    confirmation: () =>
        PageElement.located(By.id('chat-confirmation'))
            .describedAs('confirmación solicitada por el agente'),

    confirmationQuestion: () =>
        PageElement.located(By.id('chat-question'))
            .describedAs('pregunta de confirmación del agente'),

    confirmButton: () =>
        PageElement.located(By.id('chat-yes'))
            .describedAs('botón Sí del chat'),

    agentMessages: () =>
        PageElements.located(By.xpath(`//div[@id='chat-history']/article[contains(@class,'assistant')]/p`))
            .describedAs('mensajes del agente'),

    toolCards: () =>
        PageElements.located(By.xpath(`//div[@id='chat-history']/details`))
            .describedAs('herramientas ejecutadas por el agente'),

    toolSummaries: () =>
        PageElements.located(By.xpath(`//div[@id='chat-history']/details/summary`))
            .describedAs('resumen de las herramientas ejecutadas'),

    lastToolSummaryFor: (toolName: string) =>
        PageElement.located(By.xpath(`(//div[@id='chat-history']/details/summary[contains(normalize-space(),'${ toolName } ·')])[last()]`))
            .describedAs(`resultado de la herramienta ${ toolName }`),
}
