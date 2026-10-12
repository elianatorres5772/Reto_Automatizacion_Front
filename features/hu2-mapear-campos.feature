# language: es
@HU-2
Característica: Mapear los campos solicitados al repositorio maestro
  Como analista
  Quiero que el agente cruce cada campo solicitado con el repositorio maestro
  Para que el llenado sea exacto y trazable

  Antecedentes:
    Dado que Laura abre el portal de preparación documental

  @smoke
  Esquema del escenario: Cada campo de la solicitud de <cliente> termina en un estado trazable
    Cuando selecciona la solicitud de "<cliente>"
    Y prepara los documentos de la solicitud
    Entonces cada campo solicitado queda en uno de los estados:
      | Completado      |
      | Dato faltante   |
      | Revisión humana |
    Y cada campo completado indica el campo del maestro de donde proviene

    Ejemplos:
      | cliente                              |
      | Industrias Delta S.A.S.              |
      | Corporación Andina de Servicios S.A. |
      | Agroexport Sula S. de R.L.           |
      | Logística del Istmo S.A.             |

  Esquema del escenario: Un campo sin fuente en el maestro queda faltante y sin valor inventado
    Cuando selecciona la solicitud de "<cliente>"
    Y prepara los documentos de la solicitud
    Entonces el campo "<campo>" queda en estado "Dato faltante"
    Y el campo "<campo>" no tiene un valor respaldado

    Ejemplos:
      | cliente                              | campo                            |
      | Corporación Andina de Servicios S.A. | Número de contribuyente especial |
      | Agroexport Sula S. de R.L.           | Referencias comerciales          |

  Esquema del escenario: Resolver automáticamente el sinónimo "<campo>" del glosario
    Cuando selecciona la solicitud de "<cliente>"
    Y prepara los documentos de la solicitud
    Entonces el campo "<campo>" se completa con "<valor>" desde el campo maestro "<campo_maestro>"

    Ejemplos:
      | cliente                              | campo                               | campo_maestro                 | valor                          |
      | Corporación Andina de Servicios S.A. | Nombre de la empresa                | razon_social                  | Periferia IT Group S.A.S.      |
      | Corporación Andina de Servicios S.A. | Domicilio fiscal                    | direccion                     | Calle 10 # 43A-25, Oficina 501 |
      | Logística del Istmo S.A.             | Nombre o razón social del proveedor | razon_social                  | Periferia IT Group S.A.S.      |
      | Industrias Delta S.A.S.              | Cédula del representante legal      | representante_legal.identificacion | 71555123                  |
