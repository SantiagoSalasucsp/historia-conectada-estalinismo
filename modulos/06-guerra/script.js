// Interacciones sencillas y locales del módulo 6.
'use strict';
const contenido = window.MODULO;
const panel = document.querySelector('#panel');
function crear(tipo, texto, clase) {
  const elemento = document.createElement(tipo);
  if (texto) elemento.textContent = texto;
  if (clase) elemento.className = clase;
  return elemento;
}
function mostrarBatallas() {
  panel.append(crear('p', 'Selecciona una batalla para conocer su importancia.', 'instruccion'));
  const botones = crear('div', '', 'batallas');
  const ficha = crear('article', '', 'ficha-batalla'); ficha.setAttribute('aria-live','polite');
  function elegir(indice) {
    const batalla = contenido.batallas[indice];
    botones.querySelectorAll('button').forEach((boton, i) => {
      boton.classList.toggle('seleccionada', i === indice);
      boton.setAttribute('aria-pressed', String(i === indice));
    });
    ficha.replaceChildren(crear('span', batalla.fecha, 'numero-panel'), crear('h4', batalla.nombre), crear('p', batalla.hecho), crear('p', batalla.importancia, 'importancia'));
  }
  contenido.batallas.forEach((batalla, indice) => {
    const boton = crear('button', batalla.nombre);
    boton.addEventListener('click', () => elegir(indice)); botones.append(boton);
  });
  panel.append(botones, ficha); elegir(0);
}
function mostrarApartado(indice) {
  const apartado = contenido.apartados[indice];
  document.querySelectorAll('[data-apartado]').forEach((boton, i) => {
    boton.classList.toggle('activo', i === indice);
    boton.setAttribute('aria-pressed', String(i === indice));
  });
  panel.replaceChildren(crear('span', apartado.periodo, 'numero-panel'), crear('h3', apartado.titulo));
  if (indice === 2) mostrarBatallas();
  apartado.puntos.forEach(([titulo, texto]) => {
    const punto = crear('article', '', 'punto-guerra');
    punto.append(crear('h4', titulo), crear('p', texto)); panel.append(punto);
  });
  const idea = crear('aside', '', 'idea-guerra');
  idea.append(crear('span', 'QUÉ DEBES RECORDAR', 'etiqueta'), crear('p', apartado.idea)); panel.append(idea);
  const fuentes = crear('div', '', 'citas-guerra');
  fuentes.append(crear('span', 'Fuentes: '));
  apartado.fuentes.forEach(id => {
    const enlace = crear('a', '[' + id + ']'); enlace.href = '#fuente-' + id;
    enlace.setAttribute('aria-label','Consultar referencia ' + id); fuentes.append(enlace);
  });
  panel.append(fuentes);
}
contenido.apartados.forEach((apartado, indice) => {
  const boton = crear('button', '0' + (indice + 1) + ' · ' + apartado.titulo);
  boton.dataset.apartado = indice;
  boton.addEventListener('click', () => mostrarApartado(indice)); document.querySelector('#pestanas').append(boton);
});
contenido.referencias.forEach(fuente => {
  const articulo = crear('article', '', 'referencia-guerra'); articulo.id = 'fuente-' + fuente.id;
  const enlace = crear('a', 'Consultar fuente ↗'); enlace.href = fuente.url; enlace.target = '_blank'; enlace.rel = 'noopener noreferrer';
  articulo.append(crear('span', fuente.id, 'numero-panel'), crear('p', fuente.texto), enlace);
  document.querySelector('#referencias').append(articulo);
});
mostrarApartado(0);
