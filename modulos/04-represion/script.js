// Este archivo controla únicamente el módulo 4.
'use strict';
const contenido = window.MODULO;
const panel = document.querySelector('#panel');
function crear(tipo, texto, clase) {
  const elemento = document.createElement(tipo);
  if (texto) elemento.textContent = texto;
  if (clase) elemento.className = clase;
  return elemento;
}
function citas(ids) {
  const bloque = crear('div', '', 'citas');
  ids.forEach(id => {
    const enlace = crear('a', '[' + id + ']');
    enlace.href = '#fuente-' + id;
    enlace.setAttribute('aria-label', 'Consultar referencia ' + id);
    bloque.append(enlace);
  });
  return bloque;
}
function mostrarMecanismos() {
  const lista = crear('div', '', 'mecanismos');
  const detalle = crear('article', '', 'efecto-mecanismo');
  detalle.setAttribute('aria-live', 'polite');
  function seleccionar(indice) {
    const mecanismo = contenido.mecanismos[indice];
    lista.querySelectorAll('button').forEach((boton, i) => {
      boton.classList.toggle('elegido', i === indice);
      boton.setAttribute('aria-pressed', String(i === indice));
    });
    detalle.replaceChildren(crear('span', 'MECANISMO', 'etiqueta'), crear('h4', mecanismo.titulo), crear('p', mecanismo.accion), crear('span', '↓ CONSECUENCIA', 'etiqueta'), crear('p', mecanismo.efecto, 'efecto'), citas(mecanismo.fuentes));
  }
  contenido.mecanismos.forEach((mecanismo, indice) => {
    const boton = crear('button', mecanismo.titulo);
    boton.addEventListener('click', () => seleccionar(indice));
    lista.append(boton);
  });
  const distribucion = crear('div', '', 'control-interactivo');
  distribucion.append(lista, detalle); panel.append(distribucion); seleccionar(0);
}
function mostrarApartado(indice) {
  const apartado = contenido.apartados[indice];
  document.querySelectorAll('[data-apartado]').forEach((boton, i) => {
    boton.classList.toggle('activo', i === indice);
    boton.setAttribute('aria-pressed', String(i === indice));
  });
  panel.replaceChildren(crear('span', '0' + (indice + 1), 'numero-panel'), crear('h3', apartado.titulo), crear('p', apartado.descripcion, 'introduccion'));
  if (apartado.tipo === 'mecanismos') mostrarMecanismos();
  if (apartado.tipo === 'propaganda') contenido.propaganda.forEach(punto => {
    const bloque = crear('article', '', 'punto');
    bloque.append(crear('h4', punto.titulo), crear('p', punto.texto), citas(punto.fuentes)); panel.append(bloque);
  });
  if (apartado.tipo === 'casos') contenido.casos.forEach(caso => {
    const ficha = crear('details', '', 'caso');
    const titulo = crear('summary'); titulo.append(crear('span', caso.fecha, 'fecha'), crear('span', caso.titulo));
    ficha.append(titulo, crear('p', caso.texto), crear('p', caso.relacion, 'relacion-caso'), citas(caso.fuentes)); panel.append(ficha);
  });
  if (apartado.tipo === 'consecuencias') {
    contenido.consecuencias.forEach(([titulo, texto]) => {
      const bloque = crear('article', '', 'punto'); bloque.append(crear('h4', titulo), crear('p', texto)); panel.append(bloque);
    });
    panel.append(citas(['R1','R4']));
    const cifra = crear('aside', '', 'cifra');
    cifra.append(crear('strong', contenido.cifras.dato), crear('h4', contenido.cifras.etiqueta), crear('p', contenido.cifras.nota), citas(contenido.cifras.fuentes));
    panel.append(cifra, crear('p', 'No se deben sumar cifras de ejecuciones, muertes en campos, hambrunas y deportaciones sin revisar periodos, categorías y posibles solapamientos.', 'nota-cifras'));
  }
}
contenido.apartados.forEach((apartado, indice) => {
  const boton = crear('button', '0' + (indice + 1) + ' · ' + apartado.titulo); boton.dataset.apartado = indice;
  boton.addEventListener('click', () => mostrarApartado(indice)); document.querySelector('#pestanas').append(boton);
});
contenido.referencias.forEach(referencia => {
  const fila = crear('article', '', 'referencia'); fila.id = 'fuente-' + referencia.id;
  fila.append(crear('span', referencia.id, 'numero-panel'), crear('p', referencia.texto));
  const enlace = crear('a', 'Consultar fuente ↗'); enlace.href = referencia.url; enlace.target = '_blank'; enlace.rel = 'noopener noreferrer'; fila.append(enlace);
  document.querySelector('#referencias').append(fila);
});
contenido.lecturasEquipo.forEach(texto => document.querySelector('#lecturas-equipo').append(crear('p', texto)));
mostrarApartado(0);

// El video es local: también funciona desde la carpeta descomprimida.
const botonVideo = document.querySelector('#ver-video');
const zonaVideo = document.querySelector('#reproductor-modulo');
const videoEquipo = document.querySelector('#video-equipo');
botonVideo.addEventListener('click', () => {
  const abrir = zonaVideo.hidden;
  zonaVideo.hidden = !abrir;
  botonVideo.setAttribute('aria-expanded', String(abrir));
  botonVideo.textContent = abrir ? 'Cerrar video −' : '▷ Ver video del módulo';
  if (!abrir) videoEquipo.pause();
});
videoEquipo.addEventListener('error', () => {
  document.querySelector('#estado-video').textContent = 'No se pudo reproducir el archivo. Prueba el enlace para abrirlo por separado.';
});
