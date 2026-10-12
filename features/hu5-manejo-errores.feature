# language: es
@HU-5 @chat
Característica: Manejo de errores claro
  Como analista
  Quiero que el agente falle de forma clara
  Para no perder tiempo depurando

  Antecedentes:
    Dado que Laura abre el portal de preparación documental

  Escenario: Cada herramienta del agente devuelve un resultado controlado
    Cuando abre la conversación con el agente para la solicitud de "Corporación Andina de Servicios S.A."
    Y le pide al agente "procesa el caso"
    Entonces cada herramienta ejecutada responde con un resultado controlado
    Y la herramienta "proveedor_generar_formulario" responde "ok"

  Escenario: Un caso inexistente se informa con un mensaje claro y sin traza técnica
    Cuando abre la conversación con el agente para la solicitud de "Industrias Delta S.A.S."
    Y le pide al agente "procesa el caso xx-empresa-inexistente"
    Entonces la herramienta "proveedor_leer_solicitud" responde "error controlado"
    Y el agente responde "Archivo o caso no encontrado."
    Y ninguna respuesta del agente expone trazas técnicas

  Escenario: Un formato no soportado se informa y el proceso continúa con lo que sí puede hacer
    Cuando abre la conversación con el agente para la solicitud de "Logística del Istmo S.A."
    Y le pide al agente "formulario"
    Entonces el agente responde "Formato no soportado: portal web"
    Y el agente responde "Campos llenos"
    Y cada herramienta ejecutada responde con un resultado controlado
    Y ninguna respuesta del agente expone trazas técnicas
