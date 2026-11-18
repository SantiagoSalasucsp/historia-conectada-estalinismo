// Interacciones sencillas y locales del módulo 2.
'use strict';
const contenido = window.MODULO;
const panel = document.querySelector('#panel');
function crear(tipo, texto, clase) {
  const elemento = document.createElement(tipo);
  if (texto) elemento.textContent = texto;
  if (clase) elemento.className = clase;
  return elemento;
}
function mostrarContraste() {
  panel.append(crear('p', 'Pulsa cada opción para contrastar el texto constitucional con la práctica política.', 'instruccion'));
  const botones = crear('div', '', 'contraste-botones');
  const ficha = crear('article', '', 'ficha-contraste'); ficha.setAttribute('aria-live', 'polite');
  function elegir(indice) {
    const contraste = contenido.contrastes[indice];
    botones.querySelectorAll('button').forEach((boton, i) => {
      boton.classList.toggle('seleccionada', i === indice);
      boton.setAttribute('aria-pressed', String(i === indice));
    });
    ficha.replaceChildren(crear('h4', contraste.titulo), crear('p', contraste.texto), crear('p', contraste.detalle, 'detalle'));
  }
  contenido.contrastes.forEach((contraste, indice) => {
    const boton = crear('button', contraste.titulo);
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
  if (indice === 3) mostrarContraste();
  apartado.puntos.forEach(([titulo, texto]) => {
    const punto = crear('article', '', 'punto-gobierno');
    punto.append(crear('h4', titulo), crear('p', texto)); panel.append(punto);
  });
  const idea = crear('aside', '', 'idea-gobierno');
  idea.append(crear('span', 'QUÉ DEBES RECORDAR', 'etiqueta'), crear('p', apartado.idea)); panel.append(idea);
  const fuentes = crear('div', '', 'citas-gobierno');
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
  const articulo = crear('article', '', 'referencia-gobierno'); articulo.id = 'fuente-' + fuente.id;
  const enlace = crear('a', 'Consultar fuente ↗'); enlace.href = fuente.url; enlace.target = '_blank'; enlace.rel = 'noopener noreferrer';
  articulo.append(crear('span', fuente.id, 'numero-panel'), crear('p', fuente.texto));
  if (fuente.url) articulo.append(enlace);
  document.querySelector('#referencias').append(articulo);
});
contenido.interpretaciones.forEach(([titulo, texto]) => {
  const bloque = crear('article'); bloque.append(crear('h4', titulo), crear('p', texto)); document.querySelector('#interpretaciones').append(bloque);
});
mostrarApartado(0);
