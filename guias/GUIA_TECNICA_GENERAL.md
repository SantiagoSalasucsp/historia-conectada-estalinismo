# Guía técnica general — Historia Conectada

## 1. Qué construimos

Es un sitio web estático de ocho páginas: una portada y siete módulos. El navegador interpreta HTML, aplica CSS y ejecuta JavaScript. No hay servidor de aplicación, cuentas, base de datos ni una herramienta de inteligencia artificial funcionando dentro de la web.

Que sea «estático» no significa que no tenga interacción: los botones, las fichas, los filtros de vista y los reproductores funcionan en el navegador. Los contenidos están escritos en archivos locales. Para cambiarlos se editan esos archivos y se recarga la página.

## 2. Qué archivo une todo

El punto de entrada es **index.html de la raíz**, no un archivo llamado main.js. Su etiqueta `<main>` contiene la portada, la pregunta central, los integrantes y la red. Cada tarjeta de la red es un enlace HTML que abre el index.html de su módulo.

Ejemplo real de ruta de una tarjeta:

```html
<a href="modulos/01-contexto/index.html">...</a>
```

`href` indica el destino. Pulsar esta tarjeta hace que el navegador cargue otra página. **mapa.js no abre los módulos**: resalta las conexiones y desplaza horizontalmente la red. La navegación la realizan los enlaces HTML.

Cada módulo carga su propio contenido.js y script.js. Como las páginas son independientes, el `window.MODULO` de una no se mezcla con el de otra.

## 3. Organización de la carpeta

```text
historia/
├── index.html                 Portada y enlaces a los siete módulos
├── styles.css                 Estilos comunes y diseño de portada
├── mapa.js                    Interacción de la red horizontal
├── assets/                    Ilustraciones SVG de los temas
├── modulos/
│   ├── 01-contexto/
│   ├── 02-gobierno/
│   ├── 03-economia/
│   ├── 04-represion/
│   ├── 05-sociedad/
│   ├── 06-guerra/
│   └── 07-consecuencias/
└── guias/                     Material de estudio separado de la web
```

Dentro de cada módulo:

| Archivo | Función | Qué modifica el integrante |
| --- | --- | --- |
| index.html | Estructura y espacios de la página | Títulos fijos, pregunta, secciones y video |
| contenido.js | Datos históricos organizados | Explicaciones, apartados, personajes o casos, referencias |
| script.js | Comportamiento | Funciones y respuestas a clics o selecciones |
| estilos.css | Presentación propia | Tamaños, colores, distribución y estados visibles |
| video.mp4, si está incorporado | Archivo audiovisual | La grabación original del módulo |

La parte 1 también contiene `imagenes/` con cuatro retratos. Los LEEME antiguos son instrucciones de la maqueta inicial; no son código y pueden describir campos anteriores. Para estudiar la versión actual, usar estas guías y los archivos actuales.

## 4. Cómo se carga un módulo

En la cabecera HTML aparecen estas instrucciones:

```html
<link rel="stylesheet" href="../../styles.css">
<link rel="stylesheet" href="estilos.css">
<script defer src="contenido.js"></script>
<script defer src="script.js"></script>
```

1. La primera hoja da la base visual común.
2. La segunda permite ajustar el diseño del módulo. Si dos reglas tienen igual prioridad, la que se carga después puede sobrescribir a la anterior.
3. contenido.js asigna un objeto a `window.MODULO`.
4. script.js lee ese objeto y crea elementos visibles.

`defer` permite descargar el script mientras se interpreta el HTML y ejecutarlo una vez analizada la página. Estos scripts clásicos diferidos conservan el orden del documento: los datos se definen antes de que la lógica los utilice.

`../../` significa «subir dos carpetas»: desde modulos/01-contexto/ se vuelve a la raíz. `imagenes/lenin.jpg` apunta a una subcarpeta del módulo. `#fuente-F1` apunta a un elemento de la misma página. Estas rutas relativas permiten abrir el sitio tanto descomprimiendo el ZIP como desde un alojamiento web.

## 5. HTML: qué significan las etiquetas principales

| Etiqueta o atributo | Función en el sitio |
| --- | --- |
| `<!doctype html>` | Declara un documento HTML moderno |
| `<html lang="es">` | Indica el idioma del documento |
| `<meta charset="utf-8">` | Permite mostrar correctamente tildes y ñ |
| `name="viewport"` | Ajusta la presentación a pantallas pequeñas |
| `<header>`, `<main>`, `<section>`, `<footer>` | Organizan cabecera, contenido, secciones y pie |
| `<h1>` a `<h4>` | Jerarquía de títulos |
| `<a href="...">` | Enlace entre páginas, a una fuente o a una sección |
| `<button>` | Control que ejecuta una acción |
| `id="panel"` | Identificador único del espacio que JavaScript actualiza |
| `class="nodo"` | Clase que agrupa tarjetas para CSS y JavaScript |
| `data-numero="1"` | Dato personalizado que JavaScript lee con `dataset.numero` |
| `<svg>` y `<path>` | Dibujan las conexiones y sus flechas en la portada |
| `<details>` y `<summary>` | Abren y cierran contenido con comportamiento nativo del navegador |
| `<video controls>` | Muestra un reproductor con controles nativos |

Un `id` identifica un elemento concreto; una `class` puede compartirse entre varios. No son intercambiables: `#panel` busca un id y `.nodo` una clase.

## 6. CSS: cómo se presenta

La raíz de styles.css define variables como `--fondo`, `--texto`, `--arena` y `--borde`. `var(--arena)` reutiliza ese color. CSS Grid organiza columnas y Flexbox alinea elementos. `gap` separa elementos; `padding` crea espacio interior; `margin` crea espacio exterior.

En la red, las tarjetas tienen posición absoluta dentro de un contenedor de dimensiones conocidas. Sus coordenadas `left` y `top` coinciden con las rutas del SVG. Para mover una tarjeta de manera importante hay que revisar también sus conexiones: no existe un motor que recalcule automáticamente las flechas.

`overflow-x: auto` permite desplazar la red. Las reglas `@media` cambian la distribución según el ancho disponible. El sitio mantiene la red horizontal y adapta el resto de la página. `:focus-visible` muestra dónde está el foco del teclado. La regla `prefers-reduced-motion` reduce animaciones para quien lo haya pedido en su sistema.

## 7. JavaScript: vocabulario que debemos entender

Estas son instrucciones de JavaScript, no comandos de terminal:

| Instrucción | Qué hace | Ejemplo real |
| --- | --- | --- |
| `const` | Declara una referencia que no se reasigna | `const panel = document.querySelector('#panel')` |
| `let` | Declara una variable cuyo valor sí puede cambiar | `let fijado = false` en las fichas del módulo 1 |
| `document.querySelector()` | Encuentra el primer elemento que coincide con un selector | `#panel` |
| `document.querySelectorAll()` | Encuentra todos los elementos coincidentes | `.nodo` o `[data-apartado]` |
| `document.createElement()` | Crea un elemento HTML en memoria | Un botón, párrafo o imagen |
| `textContent` | Coloca texto, sin interpretarlo como HTML | Mostrar una explicación histórica |
| `append()` | Añade elementos al final de un contenedor | Añadir un botón a las pestañas |
| `replaceChildren()` | Sustituye o vacía el contenido de un elemento | Limpiar el panel antes de mostrar otro apartado |
| `forEach()` | Recorre una colección | Crear un botón por apartado |
| `addEventListener()` | Registra qué hacer ante un evento | Un clic, el foco o la entrada del puntero |
| `classList.toggle()` | Activa o desactiva una clase | Marcar el botón seleccionado |
| `setAttribute()` | Modifica un atributo HTML | Actualizar `aria-expanded` |
| `dataset` | Lee o escribe atributos `data-*` | `nodo.dataset.numero` |
| `if / else` | Elige qué bloque ejecutar | Mostrar personajes o explicación |
| `===` | Compara valor y tipo sin convertirlos | Saber qué botón coincide con el índice |
| `!` | Invierte un booleano | Alternar abierto/cerrado |
| `=>` | Define una función flecha | La función que se ejecutará al hacer clic |

`const` no vuelve inmutable todo el objeto: impide reasignar la variable, pero el objeto referenciado puede tener propiedades modificables.

## 8. La portada: mapa.js, instrucciones concretas

Líneas 3–4: se buscan todas las tarjetas `.nodo` y el texto `#relacion-activa`.

Líneas 5–11: `destacar(nodo)` lee su número. Recorre las rutas con `data-conexion`; `split('-')` convierte, por ejemplo, `"2-4"` en `["2", "4"]`, e `includes(numero)` comprueba si la conexión pertenece al nodo seleccionado. `classList.toggle('destacada', condición)` decide qué flechas resaltar. Después cambia el texto explicativo con `textContent`.

Líneas 12–15: los eventos `mouseenter` y `focus` activan ese resaltado al usar mouse o teclado.

Líneas 16–18: las flechas desplazan `#mapa-desplazable` 350 píxeles a izquierda o derecha con `scrollBy`. El desplazamiento no cambia el contenido histórico.

## 9. Datos y funciones de los módulos

`window.MODULO` contiene un objeto. Dentro hay listas —arrays— de apartados y referencias. Los campos dependen de la necesidad de cada módulo. No todos tienen la misma estructura exacta: la parte 1 usa personajes; la 4 mecanismos y casos; la 5 grupos y fuentes; la 6 batallas; la 7 cambios y continuidades.

Ejemplo del patrón:

```javascript
contenido.apartados.forEach((apartado, indice) => {
  const boton = crear('button', apartado.titulo);
  boton.addEventListener('click', () => mostrarApartado(indice));
});
```

El ciclo crea controles desde los datos. El clic llama a una función con el índice de ese apartado. Un índice es una posición y empieza en cero. La función actualiza el panel; no descarga información nueva de internet.

## 10. Video

Las partes 1, 4 y 7 incorporan un video local en esta versión. En su HTML, un botón abre o cierra el contenedor del reproductor. En script.js se cambia `hidden`, se actualiza `aria-expanded` y se pausa el video al cerrar con `pause()`.

`controls` muestra reproducir, volumen, barra de tiempo y pantalla completa. `playsinline` facilita la reproducción dentro de la página en dispositivos compatibles. `preload="metadata"` pide al navegador cargar inicialmente información como la duración, sin exigir de entrada la descarga completa. El navegador decide cuánto carga.

El video no empieza automáticamente. Primero se abre y luego se pulsa reproducir. El evento de error muestra un aviso y existe un enlace para abrir el archivo por separado. Que un archivo termine en .mp4 no garantiza compatibilidad: también importan los códecs de imagen y audio.

## 11. Accesibilidad y seguridad práctica

Se puede navegar con Tab y activar botones con el teclado. `aria-label` aporta un nombre cuando hace falta; `aria-pressed` indica selección; `aria-expanded` indica apertura; `aria-controls` enlaza el control con su contenido; `aria-live="polite"` anuncia cambios sin interrumpir de manera agresiva.

Los textos se insertan con `textContent`, no con `innerHTML`. Esto evita que un párrafo de contenido sea interpretado como código HTML. Los enlaces externos usan `target="_blank"` y `rel="noopener noreferrer"`.

## 12. Cómo editar y probar

1. Abrir la carpeta del módulo correspondiente.
2. Cambiar una explicación en contenido.js sin romper comillas ni comas.
3. Guardar y recargar la página.
4. Verificar que el texto aparece y que la referencia sigue siendo la correcta.
5. Probar los botones con mouse y teclado.
6. Si se modificó el video, abrirlo y revisar reproducción, sonido y orientación.
7. Integrar los cambios en una sola copia del proyecto antes de repartir el ZIP.

Las tildes y referencias son parte del contenido académico: no se alteran para aparentar una autoría distinta. El equipo debe documentar la ayuda recibida y sus propias modificaciones de manera veraz.

## 13. Comandos de terminal útiles

```bash
python3 -m http.server 8000 --bind 127.0.0.1
```

Se ejecuta estando dentro de la carpeta del proyecto. Python inicia un servidor de archivos local en el puerto 8000, accesible en esa computadora por `http://localhost:8000`. No publica nada en internet. `Ctrl+C` lo detiene. También se puede abrir index.html directamente, sin Python.

```bash
node --check modulos/01-contexto/script.js
```

Comprueba la sintaxis de ese JavaScript. No comprueba el contenido histórico ni garantiza que todos los botones funcionen: eso requiere una prueba en el navegador. Node se usa para revisión, no para que el visitante abra la web.

Para Git, si el equipo lo utiliza:

| Comando | Función |
| --- | --- |
| `git status` | Muestra cambios y archivos pendientes |
| `git add archivo` | Prepara un archivo concreto para registrar |
| `git commit -m "Descripción"` | Guarda una versión local con un mensaje |
| `git push` | Envía versiones al repositorio remoto configurado |

Tener un repositorio en GitHub no publica por sí solo la web: hay que configurar un alojamiento, como GitHub Pages. Tampoco hay que subir el original de video pesado, los ZIP acumulados, copias antiguas o archivos personales.

## 14. Preguntas de sustentación

**¿Por qué separaron datos y código?** Para que cada integrante actualice su información sin reescribir la interacción, y para facilitar la revisión de fuentes.

**¿Qué hace la programación históricamente?** Permite seguir relaciones, seleccionar mecanismos y consecuencias, contrastar fuentes y comparar experiencias. La interpretación depende de las evidencias; los botones no demuestran una causalidad por sí mismos.

**¿La web guarda lo que hace el visitante?** Esta versión modular no guarda respuestas ni notas del visitante. La selección actual vive en la página y se reinicia al recargar.

**¿Usa una base de datos?** No. Los objetos de contenido.js son estructuras de datos en archivos, no una base de datos ni un sistema de administración.

**¿Para qué sirve el SVG?** Para dibujar conexiones de la red con rutas vectoriales, que se mantienen nítidas al escalar.

**¿Por qué no funciona localhost en el equipo de otro compañero?** Porque localhost siempre identifica la computadora de quien abre la dirección. Debe abrir su copia o visitar un enlace publicado.

**¿Qué falta por terminar?** Los siete módulos tienen contenido incorporado; los videos solo están integrados donde fueron entregados. Esta guía describe el código actual, no certifica que todo el producto académico esté finalizado.
