# language: es
@HU-3
Característica: Generar el formulario en el formato pedido
  Como analista
  Quiero obtener el formulario lleno en el mismo formato que envió el cliente
  Para no reformatear nada

  Antecedentes:
    Dado que Laura abre el portal de preparación documental

  @P0 @smoke
  Esquema del escenario: P0 - Excel con cada etiqueta y valor en la celda de la plantilla de <cliente>
    Cuando selecciona la solicitud de "<cliente>"
    Y prepara los documentos de la solicitud
    Y descarga el documento "formulario.xlsx"
    Entonces el formulario Excel "formulario.xlsx" ubica cada etiqueta y su valor en la celda indicada por la plantilla de "<cliente>"

    Ejemplos:
      | cliente                    |
      | Industrias Delta S.A.S.    |
      | Agroexport Sula S. de R.L. |

  @P1
  Escenario: P1 - PDF con todos los campos, su etiqueta y su valor en el orden solicitado
    Cuando selecciona la solicitud de "Corporación Andina de Servicios S.A."
    Y prepara los documentos de la solicitud
    Y descarga el documento "formulario.pdf"
    Entonces el formulario PDF "formulario.pdf" reproduce todos los campos con su etiqueta y valor en el orden solicitado

  @P2
  Escenario: P2 - Portal web no soportado entrega los valores listos para copiar
    Cuando selecciona la solicitud de "Logística del Istmo S.A."
    Y prepara los documentos de la solicitud
    Entonces se informa que el formato portal web no está soportado
    Y no se solicita autorización para armar el paquete
    Cuando descarga el documento "valores-portal.md"
    Entonces el archivo "valores-portal.md" contiene todos los campos con su valor listos para copiar
