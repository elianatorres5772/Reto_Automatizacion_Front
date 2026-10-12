# language: es
@HU-1
Característica: Leer la solicitud del cliente
  Como analista
  Quiero que el agente lea el correo del cliente y la plantilla adjunta
  Para saber qué campos y qué soportes me piden sin abrir cada archivo

  Antecedentes:
    Dado que Laura abre el portal de preparación documental

  @smoke
  Esquema del escenario: Identificar país, formato de salida y soportes exigidos de la solicitud de <cliente>
    Cuando selecciona la solicitud de "<cliente>"
    Y revisa el correo recibido
    Entonces la solicitud corresponde al país "<pais>" con formato de salida "<formato>"
    Y los soportes exigidos son "<soportes>"

    Ejemplos:
      | cliente                              | pais | formato | soportes                                                                                           |
      | Industrias Delta S.A.S.              | CO   | XLSX    | camara_comercio, rut, certificacion_bancaria, estados_financieros                                  |
      | Corporación Andina de Servicios S.A. | EC   | PDF     | camara_comercio, rut, certificacion_bancaria, estados_financieros, certificado_cumplimiento_tributario |
      | Agroexport Sula S. de R.L.           | HN   | XLSX    | camara_comercio, rut, parafiscales                                                                 |
      | Logística del Istmo S.A.             | PA   | PORTAL  | camara_comercio, rut                                                                               |

  Escenario: Listar los campos solicitados por la plantilla del cliente
    Cuando selecciona la solicitud de "Agroexport Sula S. de R.L."
    Y prepara los documentos de la solicitud
    Entonces los campos solicitados son:
      | campo                   |
      | Razón social            |
      | RTN                     |
      | País                    |
      | Dirección               |
      | Teléfono                |
      | Correo electrónico      |
      | Representante legal     |
      | Fecha de constitución   |
      | Número de empleados     |
      | Ingresos anuales        |
      | Referencias comerciales |

  Esquema del escenario: Reportar la identificación tributaria ambigua con el equivalente de <pais>
    Cuando selecciona la solicitud de "<cliente>"
    Y prepara los documentos de la solicitud
    Entonces el campo "<campo>" queda en estado "Revisión humana"
    Y el campo "<campo>" propone revisar el equivalente "<equivalente>"

    Ejemplos:
      | cliente                              | pais | campo | equivalente |
      | Corporación Andina de Servicios S.A. | EC   | RUC   | RUC         |
      | Agroexport Sula S. de R.L.           | HN   | RTN   | RTN         |
      | Logística del Istmo S.A.             | PA   | RUC   | RUC         |

  Escenario: La identificación tributaria del país de origen no requiere confirmación
    Cuando selecciona la solicitud de "Industrias Delta S.A.S."
    Y prepara los documentos de la solicitud
    Entonces el campo "NIT" queda en estado "Completado"
