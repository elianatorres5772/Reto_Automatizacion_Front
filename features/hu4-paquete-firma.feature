# language: es
@HU-4
Característica: Armar el paquete para firma
  Como analista
  Quiero un paquete con el formulario, los soportes y un borrador de correo
  Para enviarlo a firma en un solo paso

  Antecedentes:
    Dado que Laura abre el portal de preparación documental

  Escenario: Pedir confirmación explícita antes de armar el paquete
    Cuando selecciona la solicitud de "Industrias Delta S.A.S."
    Y prepara los documentos de la solicitud
    Entonces se solicita confirmación con la pregunta "¿Confirmas que prepare el paquete documental de esta solicitud para revisión y firma del representante legal?"
    Y el documento "paquete-borrador.zip" todavía no está disponible para descargar

  @smoke
  Esquema del escenario: Armar el paquete de <cliente> al autorizar la preparación
    Cuando selecciona la solicitud de "<cliente>"
    Y prepara los documentos de la solicitud
    Y autoriza la preparación del paquete
    Y descarga el documento "paquete-borrador.zip"
    Entonces el resultado de la preparación es "<resultado>"
    Y el paquete "paquete-borrador.zip" contiene:
      | archivo            |
      | <formulario>       |
      | checklist.md       |
      | borrador-correo.md |
    Y el paquete "paquete-borrador.zip" incluye una copia de cada soporte disponible
    Y el checklist del paquete "paquete-borrador.zip" indica "Listo para firma: <listo>"

    Ejemplos:
      | cliente                              | formulario      | resultado                                | listo |
      | Industrias Delta S.A.S.              | formulario.xlsx | Paquete listo para revisión y firma      | sí    |
      | Corporación Andina de Servicios S.A. | formulario.pdf  | Paquete generado con soportes pendientes | no    |

  Escenario: Un soporte exigido ausente queda en el checklist y bloquea la firma
    Cuando selecciona la solicitud de "Corporación Andina de Servicios S.A."
    Y prepara los documentos de la solicitud
    Y autoriza la preparación del paquete
    Y descarga el documento "paquete-borrador.zip"
    Entonces el soporte "certificado_cumplimiento_tributario" figura como "Ausente"
    Y el checklist del paquete "paquete-borrador.zip" indica "certificado_cumplimiento_tributario"
    Y el resultado de la preparación es "Paquete generado con soportes pendientes"

  Esquema del escenario: La vigencia de los soportes de <cliente> determina si el paquete queda listo para firma
    Cuando selecciona la solicitud de "<cliente>"
    Y prepara los documentos de la solicitud
    Y autoriza la preparación del paquete
    Entonces ningún soporte con vigencia anterior a la fecha de evaluación figura como disponible
    Y el paquete solo queda listo para firma si no hay soportes vencidos ni ausentes

    Ejemplos:
      | cliente                              |
      | Industrias Delta S.A.S.              |
      | Corporación Andina de Servicios S.A. |
      | Agroexport Sula S. de R.L.           |

  Escenario: Cancelar la preparación conserva el formulario y no arma el paquete
    Cuando selecciona la solicitud de "Industrias Delta S.A.S."
    Y prepara los documentos de la solicitud
    Y cancela la preparación del paquete
    Entonces el resultado de la preparación es "Empaquetado cancelado"
    Y el documento "paquete-borrador.zip" todavía no está disponible para descargar

  @chat
  Escenario: El agente pide confirmación explícita antes de simular el envío
    Cuando abre la conversación con el agente para la solicitud de "Industrias Delta S.A.S."
    Y le pide al agente "procesa el caso"
    Entonces el agente solicita confirmación antes de continuar
    Cuando confirma la acción solicitada por el agente
    Y le pide al agente "envía"
    Entonces el agente solicita confirmación antes de continuar
    Cuando confirma la acción solicitada por el agente
    Entonces el agente registra el envío simulado en "ENVIO-SIMULADO.md"
