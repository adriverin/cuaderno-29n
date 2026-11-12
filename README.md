# Cuaderno 29N

Abre `index.html` con Chrome, Firefox, Safari o Edge. Es un archivo autónomo: para enviarlo a otra persona, basta con enviar ese archivo. No necesita instalación ni servidor. Los enlaces a las fuentes requieren internet.

## Contenido y alcance

Edición elaborada el 12 de noviembre de 2026 con corte de investigación del 11 de noviembre: 10 partidos, 358 fichas de propuestas, 29 principios y 114 referencias. Los documentos electorales completos están enlazados cuando se verificaron.

Esta es una selección documentada y amplia, **no la extracción exhaustiva de todos los puntos de todos los programas**. PP, PNV y BNG tienen documentos de 2026 localizados, con extracción parcial. Para los demás no se verificó un manifiesto integral específico del 29N; se incorporan posiciones y declaraciones identificadas, y algunos antecedentes históricos. Consulta las lagunas en «Los partidos». Las fuentes partidarias acreditan sus posiciones, no necesariamente la exactitud de sus afirmaciones sobre hechos externos.

## Valorar y conservar respuestas

- Acuerdo de −2 a +2; 0 es neutral/mixto y «No sé» no puntúa.
- Importancia de 1 a 5; estrella independiente para lo imprescindible.
- Notas en «Fuente y contexto».
- Balance por temas y pesos personales en «Mi cuaderno».
- Exporta periódicamente tus respuestas a JSON. Importar permite combinarlas con una copia previa.

Las respuestas viven en el almacenamiento del navegador. No están en el HTML que compartes. Pueden perderse al limpiar datos, cambiar de navegador o mover el archivo. La exportación sí contiene respuestas y notas personales. No hay sincronización ni transmisión a un servidor.

## Actualizar la investigación

Los archivos de `research/` contienen datos y referencias. Mantén IDs estables cuando la propuesta no cambia. Si cambia de significado, crea un ID nuevo y conserva la antigua como antecedente; no reutilices una valoración para una política distinta. Cambia la fecha editorial solo después de revisar las fuentes correspondientes.

Reconstruir el HTML, desde esta carpeta:

```sh
python3 scripts/build.py
node scripts/test-core.js
```

El constructor comprueba IDs, temas y referencias. No se necesita instalar dependencias. `src/` contiene la interfaz y el cálculo; `index.html` incorpora todos los recursos. No edites el HTML generado si quieres conservar las modificaciones tras reconstruirlo.

## Verificación

Comprobados: sintaxis JavaScript; integridad de datos y fuentes; neutral frente a sin respuesta; exclusión de históricos del balance; pesos de temas; comparación sobre temas comunes; validación de importaciones. En navegador se comprobaron el renderizado, las valoraciones, estrellas y persistencia tras recargar. La importación/exportación de archivos se implementó y su formato se validó; no se verificó todo el recorrido de selección de archivos en todos los navegadores. El diseño incluye adaptaciones para pantallas pequeñas.
