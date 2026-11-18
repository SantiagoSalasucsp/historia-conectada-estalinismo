# Guía detallada para sustentar el módulo 1

## 1. Qué hace tu parte

La pregunta es qué condiciones históricas y políticas permitieron el ascenso de Stalin. La página ofrece cuatro entradas: Rusia y nacimiento de la URSS; antecedentes políticos; personajes; llegada de Stalin al poder. El visitante selecciona una entrada y JavaScript cambia solo el panel de contenido. En personajes puede abrir fichas con mouse, clic o teclado.

No se hace una petición a un servidor cada vez que se pulsa un apartado. Todos los datos ya llegaron en contenido.js. Las referencias se crean al cargar y permanecen al final. El video se abre desde su botón y tiene controles nativos.

## 2. Los cinco recursos que debes localizar

| Recurso | Dónde está | Para qué sirve |
| --- | --- | --- |
| Estructura | modulos/01-contexto/index.html | Pregunta, contenedores, enlaces y reproductor |
| Datos | modulos/01-contexto/contenido.js | Lo que dicen los apartados, fichas y bibliografía |
| Lógica | modulos/01-contexto/script.js | Crear, seleccionar, mostrar, abrir y cerrar |
| Apariencia | modulos/01-contexto/estilos.css y styles.css de la raíz | Tarjetas, columnas, colores y adaptación |
| Medios | imagenes/ y video.mp4 dentro de 01-contexto | Retratos y tu grabación |

## 3. HTML: espacios que JavaScript utiliza

En index.html busca estos identificadores:

- `id="pestanas"`: contenedor inicialmente vacío donde el script añade cuatro botones.
- `id="panel"`: artículo donde aparecerá el apartado seleccionado. Tiene `aria-live="polite"`.
- `id="referencias"`: espacio donde se crea la bibliografía.
- `id="creditos-imagenes"`: espacio con la atribución de cada retrato.
- `id="ver-video"`: botón de abrir o cerrar el video.
- `id="reproductor-modulo"`: bloque que empieza oculto con `hidden`.
- `id="video-equipo"`: reproductor HTML.
- `id="estado-video"`: aviso si ocurre un error de reproducción.

Un contenedor vacío no implica que falte contenido: puede llenarse al ejecutar JavaScript. Si el archivo script.js falla, estos espacios pueden quedar vacíos aunque el resto del HTML aparezca.

En `<head>`, contenido.js aparece antes de script.js y ambos usan `defer`. Si inviertes ese orden, el script podría intentar leer `window.MODULO` antes de que exista.

## 4. Cómo están organizados los datos

contenido.js empieza con:

```javascript
window.MODULO = {
  numero: 1,
  apartados: [...],
  personajes: [...],
  referencias: [...]
};
```

Es un objeto asignado a una propiedad de `window`, el objeto global del navegador. `apartados` es una lista de cuatro objetos. Cada uno tiene:

- `titulo`: nombre de la entrada.
- `periodo`: fecha o rótulo superior.
- `puntos`: lista de parejas `[subtitulo, explicacion]`.
- `idea`: idea clave para cerrar la lectura.
- `fuentes`: lista de identificadores como `F1` y `F2`.

`personajes` es una lista de cuatro objetos con nombre, fechas, rol, imagen, aporte, clave, crédito y enlace a la ficha de origen. Los retratos no se generan en el navegador: `src` apunta a archivos locales existentes.

`referencias` tiene objetos con `id`, `texto`, `url` y `uso`. El identificador `F1` vincula el apartado con la entrada bibliográfica que tiene ese id.

Ejemplo: si un apartado tiene `fuentes: ['F1', 'F2']`, el script crea enlaces a `#fuente-F1` y `#fuente-F2`. No comprueba automáticamente si esas lecturas demuestran lo que dice el texto; esa verificación corresponde al equipo.

## 5. Recorrido por script.js con líneas de esta versión

### Líneas 2–5: preparar las referencias de trabajo

```javascript
'use strict';
const contenido = window.MODULO;
const panel = document.querySelector('#panel');
const botones = document.querySelector('#pestanas');
```

`'use strict'` activa reglas más estrictas de JavaScript y ayuda a detectar errores como ciertas asignaciones a variables no declaradas. `contenido` permite usar los datos con un nombre corto. `querySelector` localiza elementos reales del HTML. El símbolo `#` significa que buscamos un id.

### Líneas 6–11: función crear

```javascript
function crear(etiqueta, texto, clase) {
  const elemento = document.createElement(etiqueta);
  if (texto) elemento.textContent = texto;
  if (clase) elemento.className = clase;
  return elemento;
}
```

Una función agrupa instrucciones reutilizables. Aquí los parámetros son etiqueta, texto y clase. `crear('p', 'Una explicación', 'cita')` produce un párrafo con ese texto y esa clase. `return` devuelve el elemento a quien llamó la función. Todavía no aparece en pantalla hasta que se inserta en el documento.

Los `if` evitan asignar valores cuando no se proporcionan. `textContent` muestra texto plano: una etiqueta escrita en una explicación no se ejecutaría como HTML.

### Líneas 12–17: función enlaceFuente

Recibe un identificador, crea un enlace y compone su destino con `'#fuente-' + id`. El `+` concatena cadenas. `aria-label` le da un nombre comprensible al enlace para tecnologías de asistencia. La función devuelve el enlace para insertarlo donde corresponde.

### Líneas 18–44: mostrarApartado

Es la función central del módulo. Recibe `indice`, busca `contenido.apartados[indice]` y reconstruye el panel.

Los índices empiezan en cero:

| Índice | Entrada |
| --- | --- |
| 0 | Rusia y nacimiento de la URSS |
| 1 | Antecedentes políticos |
| 2 | Personajes importantes |
| 3 | Llegada de Stalin al poder |

Líneas 20–23: recorre los botones `[data-apartado]`. La condición `i === indice` identifica el seleccionado. `classList.toggle('activo', condición)` añade o retira la clase visual. `aria-pressed` comunica el mismo estado de selección.

Línea 24: `panel.replaceChildren()` vacía el panel anterior. Si se omitiera y solo se añadieran elementos, al cambiar de apartado se acumularían los textos.

Línea 25: `panel.append(...)` añade el periodo y el título.

Líneas 26–37: hay una decisión. Si el índice es 2, se crean las fichas de personajes; de lo contrario se recorren los puntos históricos. La expresión `([titulo, texto])` es desestructuración: toma los dos valores de cada pareja y les da nombres.

Líneas 38–43: se añaden la idea clave y los enlaces a sus referencias.

**Detalle que conviene saber:** el tratamiento especial de personajes depende de `indice === 2`. Si cambias el orden de los apartados en contenido.js, debes revisar esa condición. No conviene reordenar la lista sin comprobar el resultado.

### Líneas 45–77: mostrarPersonajes

Crea una cuadrícula y recorre `contenido.personajes`. Por cada persona construye:

1. Un `<article>` para la tarjeta.
2. Un `<img>` cuyo `src` contiene la ruta del retrato y cuyo `alt` describe a quién muestra.
3. Un encabezado con rol, nombre y fechas.
4. Un botón para abrir la explicación.
5. Un bloque de detalle que empieza oculto.

`foto.loading = 'lazy'` permite al navegador retrasar la carga de una imagen que aún no necesita mostrar.

`detalle.id = 'aporte-' + indice` crea ids diferentes: aporte-0, aporte-1, etc. `aria-controls` vincula el botón con su bloque. `aria-expanded` indica si está abierto.

### Líneas 60–72: cómo funciona abrir y fijar una ficha

`let fijado = false` es un estado propio de cada tarjeta. Se declara dentro del ciclo, por lo que cada personaje conserva su propia variable.

La función interna `actualizar(abierto)` realiza cuatro cosas:

- `detalle.hidden = !abierto`: oculta si no debe estar abierto.
- Actualiza `aria-expanded`.
- Cambia el texto del botón con un operador ternario: `condicion ? valorSi : valorNo`.
- Activa o retira la clase `abierta` para el borde visual.

El clic invierte `fijado` con `!fijado`. Después usa ese nuevo valor para actualizar la tarjeta. Al entrar el mouse se abre temporalmente; al salir se mantiene abierta si quedó fijada o si el teclado conserva el foco dentro. `focusin` abre para usuarios de teclado; `focusout` comprueba si el nuevo foco quedó fuera mediante `relatedTarget`.

`||` significa «o»: basta con que se cumpla una de las condiciones. `contains()` comprueba si un elemento está dentro de otro.

**¿Qué es una clausura o closure aquí?** El evento recuerda la variable `fijado` de su tarjeta incluso después de terminar el ciclo que creó los elementos. Así cada botón controla su propio estado. No necesitas memorizar la palabra para explicar la idea: «cada ficha recuerda si la dejé abierta».

### Líneas 78–83: crear los botones de navegación

`forEach` recorre los cuatro apartados. `dataset.apartado = indice` escribe el atributo de datos. `addEventListener('click', () => mostrarApartado(indice))` registra lo que debe ocurrir después, cuando llegue un clic.

La función flecha es importante: **no** ejecuta inmediatamente mostrarApartado. Si se escribiera `addEventListener('click', mostrarApartado(indice))`, se llamaría la función durante la creación del botón y no se registraría correctamente el comportamiento esperado.

### Líneas 84–97: bibliografía y créditos

Se crea una entrada por referencia. `fila.id = 'fuente-' + fuente.id` genera el destino de los enlaces que aparecieron en cada apartado. `target='_blank'` abre otra pestaña; `rel='noopener noreferrer'` evita compartir la referencia de apertura y limita información enviada sobre el origen.

Los créditos se generan a partir de los datos de cada personaje. Cambiar un retrato exige revisar la atribución y su enlace, no solo el archivo de imagen.

### Línea 98: contenido inicial

`mostrarApartado(0)` muestra la primera entrada al cargar. Sin esa llamada, los botones existirían, pero el panel empezaría vacío hasta el primer clic.

### Líneas 100–113: tu video

Se localizan botón, contenedor y reproductor. Al hacer clic:

```javascript
const abrir = zonaVideo.hidden;
zonaVideo.hidden = !abrir;
botonVideo.setAttribute('aria-expanded', String(abrir));
if (!abrir) videoEquipo.pause();
```

Si el contenedor estaba oculto, `abrir` es true y se muestra. Si estaba visible, se oculta y se pausa. `String()` convierte el booleano en el texto que se usa como atributo. El navegador maneja la reproducción mediante sus controles; este bloque no graba, edita ni genera el video.

El video vive en `modulos/01-contexto/video.mp4`. El archivo original parte1.mov se conserva aparte y no hace falta compartirlo dentro del sitio. Se convirtió una copia a MP4 para reducir tamaño y facilitar reproducción.

## 6. CSS del módulo: qué debes buscar

- `.apartados`: distribución de los botones y el panel.
- `#pestanas button.activo`: color del apartado seleccionado.
- `.punto-contexto`: cada explicación breve.
- `.personajes`: cuadrícula de retratos.
- `.personaje > img`: tamaño y recorte visual de las imágenes.
- `.personaje.abierta`: borde de la ficha abierta.
- `.personaje-detalle`: texto que se oculta o muestra.
- `.idea-clave`: bloque que resume la relación histórica.
- `.referencia`: presentación de la bibliografía.
- `@media`: cambia las columnas para pantallas más estrechas.
- `#video-equipo`: limita el tamaño del reproductor y conserva su proporción natural.

El recorte con `object-fit: cover` afecta a la presentación, no cambia el archivo original. El atributo `hidden` representa el estado de ocultación; CSS le da estilo a lo que está visible.

## 7. Cómo responder preguntas con una demostración

**«Explícame una función».** Abre script.js en mostrarApartado. Di: «Recibe una posición de la lista, busca ese apartado, marca su botón, limpia el panel y añade el contenido correspondiente». Luego cambia de pestaña en la web.

**«¿Dónde está la información histórica?».** Abre contenido.js y localiza apartados y personajes. Di: «Los datos están separados de la función que los dibuja; puedo cambiar el texto sin reprogramar el clic».

**«¿Qué evento usaste?».** Señala `addEventListener('click', ...)`. Explica el elemento que lo recibe y la función que se llama. También puedes mostrar mouseenter y focusin para una ficha.

**«¿Cómo se conectan las fuentes?».** Muestra `fuentes: ['F1', 'F2']`, enlaceFuente y el id fuente-F1. Haz clic en la referencia de la página para llegar a la bibliografía.

**«¿Por qué se repite forEach?».** Porque varias partes son listas: apartados, personas y referencias. Se reutiliza un patrón de representación sin escribir cada tarjeta por separado.

**«¿Por qué no usar innerHTML?».** Porque aquí basta texto plano. textContent evita que el contenido se interprete como etiquetas o código HTML.

**«¿Cómo funciona en el celular sin mouse?».** Los aportes tienen botones que responden al clic o toque. La apertura no depende exclusivamente de pasar el puntero.

**«¿Dónde se guarda lo que selecciono?».** En el estado temporal de los elementos y las variables de la página. No se guarda en una base de datos ni persiste al recargar.

**«¿Qué pasa si falta el video?».** El navegador puede fallar al cargarlo; el manejador de error muestra un aviso. Debe conservarse la ruta y el nombre correctos y probar la reproducción antes de exponer.

**«¿Qué límite tiene tu implementación?».** La posición especial del apartado de personajes está fijada en el índice 2. Además, las referencias se vinculan por identificadores que hay que revisar manualmente.

## 8. Ensayo práctico de diez minutos

1. Localiza la pregunta en index.html.
2. Encuentra una frase del guion en contenido.js.
3. Explica mostrarApartado con tus palabras y pulsa el apartado correspondiente.
4. Abre una ficha, sal con el mouse y comprueba si queda fijada tras el clic.
5. Usa Tab para llegar a otra ficha y actívala.
6. Pulsa un enlace F1 o F2 y muestra dónde se forma su destino.
7. Abre el video, reproduce unos segundos y ciérralo para comprobar la pausa.
8. Cambia un texto de prueba y vuelve al original después de comprobar el resultado.

No necesitas recitar todo el archivo. Debes poder seguir una acción desde el botón hasta la función, desde la función hasta los datos y desde los datos hasta el contenido que ve el usuario.
