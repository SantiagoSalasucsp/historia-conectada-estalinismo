// Lógica independiente del módulo 1: apartados, personajes y referencias.
'use strict';
const contenido = window.MODULO;
const panel = document.querySelector('#panel');
const botones = document.querySelector('#pestanas');
function crear(etiqueta, texto, clase) {
  const elemento = document.createElement(etiqueta);
  if (texto) elemento.textContent = texto;
  if (clase) elemento.className = clase;
  return elemento;
}
function enlaceFuente(id) {
  const enlace = crear('a', '[' + id + ']');
  enlace.href = '#fuente-' + id;
  enlace.setAttribute('aria-label', 'Consultar referencia ' + id);
  return enlace;
}
function mostrarApartado(indice) {
  const apartado = contenido.apartados[indice];
  document.querySelectorAll('[data-apartado]').forEach((boton, i) => {
    boton.classList.toggle('activo', i === indice);
    boton.setAttribute('aria-pressed', String(i === indice));
  });
  panel.replaceChildren();
  panel.append(crear('span', apartado.periodo, 'numero-panel'), crear('h3', apartado.titulo));
  if (indice === 2) {
    panel.append(crear('p', 'Pasa sobre un retrato o pulsa «Ver aporte».', 'instruccion-personajes'));
    mostrarPersonajes();
  } else {
    const lista = crear('div', '', 'puntos-contexto');
    apartado.puntos.forEach(([titulo, texto]) => {
      const bloque = crear('div', '', 'punto-contexto');
      bloque.append(crear('h4', titulo), crear('p', texto));
      lista.append(bloque);
    });
    panel.append(lista);
  }
  const idea = crear('div', '', 'idea-clave');
  idea.append(crear('span', 'QUÉ DEBES RECORDAR', 'etiqueta'), crear('p', apartado.idea));
  const citas = crear('div', '', 'citas-apartado');
  citas.append(crear('span', 'Fuentes: '));
  apartado.fuentes.forEach(id => citas.append(enlaceFuente(id)));
  panel.append(idea, citas);
}
function mostrarPersonajes() {
  const cuadrilla = crear('div', '', 'personajes');
  contenido.personajes.forEach((persona, indice) => {
    const tarjeta = crear('article', '', 'personaje');
    const foto = crear('img'); foto.src = persona.imagen; foto.alt = 'Retrato de ' + persona.nombre;
    foto.loading = 'lazy';
    const encabezado = crear('div', '', 'personaje-cabecera');
    encabezado.append(crear('span', persona.rol, 'rol-personaje'), crear('h4', persona.nombre), crear('p', persona.fechas));
    const boton = crear('button', 'Ver aporte +', 'ver-aporte');
    const detalle = crear('div', '', 'personaje-detalle');
    detalle.id = 'aporte-' + indice; detalle.hidden = true;
    boton.setAttribute('aria-expanded', 'false');
    boton.setAttribute('aria-controls', detalle.id);
    boton.setAttribute('aria-label', 'Ver aporte de ' + persona.nombre);
    detalle.append(crear('p', persona.aporte), crear('p', persona.clave, 'clave-personaje'));
    let fijado = false;
    function actualizar(abierto) {
      detalle.hidden = !abierto;
      boton.setAttribute('aria-expanded', String(abierto));
      boton.textContent = abierto ? 'Cerrar aporte −' : 'Ver aporte +';
      tarjeta.classList.toggle('abierta', abierto);
    }
    // El clic fija la apertura; el mouse permite una lectura rápida sin pulsar.
    boton.addEventListener('click', () => { fijado = !fijado; actualizar(fijado); });
    tarjeta.addEventListener('mouseenter', () => actualizar(true));
    tarjeta.addEventListener('mouseleave', () => actualizar(fijado || tarjeta.contains(document.activeElement)));
    tarjeta.addEventListener('focusin', () => actualizar(true));
    tarjeta.addEventListener('focusout', evento => { if (!tarjeta.contains(evento.relatedTarget)) actualizar(fijado); });
    tarjeta.append(foto, encabezado, boton, detalle);
    cuadrilla.append(tarjeta);
  });
  panel.append(cuadrilla);
}
contenido.apartados.forEach((apartado, indice) => {
  const boton = crear('button', '0' + (indice + 1) + ' · ' + apartado.titulo);
  boton.dataset.apartado = indice;
  boton.addEventListener('click', () => mostrarApartado(indice));
  botones.append(boton);
});
const referencias = document.querySelector('#referencias');
contenido.referencias.forEach(fuente => {
  const fila = crear('article', '', 'referencia'); fila.id = 'fuente-' + fuente.id;
  fila.append(crear('span', fuente.id, 'numero-panel'), crear('p', fuente.texto), crear('p', fuente.uso, 'uso-fuente'));
  const enlace = crear('a', 'Consultar fuente ↗'); enlace.href = fuente.url;
  enlace.target = '_blank'; enlace.rel = 'noopener noreferrer'; fila.append(enlace);
  referencias.append(fila);
});
const creditos = document.querySelector('#creditos-imagenes');
contenido.personajes.forEach(persona => {
  const p = crear('p', persona.nombre + ': ' + persona.credito + ' ');
  const enlace = crear('a', 'Ficha de la imagen ↗'); enlace.href = persona.url;
  enlace.target = '_blank'; enlace.rel = 'noopener noreferrer'; p.append(enlace); creditos.append(p);
});
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
