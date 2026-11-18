// Este archivo controla SOLO este módulo. Sus datos están en contenido.js.
'use strict';
const contenido = window.MODULO;
const panel = document.querySelector('#panel');
const botones = document.querySelector('#pestanas');
function mostrarApartado(indice) {
  const apartado = contenido.apartados[indice];
  document.querySelectorAll('[data-apartado]').forEach((boton, i) => {
    boton.classList.toggle('activo', i === indice);
    boton.setAttribute('aria-pressed', String(i === indice));
  });
  panel.replaceChildren();
  const numero = document.createElement('span'); numero.className = 'numero-panel'; numero.textContent = '0' + (indice + 1);
  const titulo = document.createElement('h3'); titulo.textContent = apartado.titulo;
  const texto = document.createElement('p'); texto.textContent = apartado.texto || 'Contenido pendiente de incorporar.';
  texto.className = apartado.texto ? '' : 'pendiente';
  const cita = document.createElement('p'); cita.className = 'cita'; cita.textContent = apartado.cita || 'Cita y localizador de la evidencia: pendientes.';
  panel.append(numero, titulo, texto, cita);
}
contenido.apartados.forEach((apartado, indice) => {
  const boton = document.createElement('button'); boton.textContent = apartado.titulo; boton.dataset.apartado = indice;
  boton.addEventListener('click', () => mostrarApartado(indice)); botones.append(boton);
});
function completarTexto(selector, texto) {
  const lugar = document.querySelector(selector); if (!lugar) return;
  lugar.textContent = texto || 'Pendiente de completar.';
  lugar.classList.toggle('pendiente', !texto);
}
completarTexto('#referencias', contenido.referencias);
completarTexto('#conclusion', contenido.conclusion);
mostrarApartado(0);
// Recurso adicional: comparar evidencia y perspectiva; no calcula una verdad histórica.
const selectores = document.querySelectorAll('[data-fuente]');
selectores.forEach(selector => {
  contenido.fuentes.forEach((fuente, indice) => { const opcion = document.createElement('option'); opcion.value = indice; opcion.textContent = fuente.titulo; selector.append(opcion); });
  const actualizar = () => {
    const fuente = contenido.fuentes[Number(selector.value)];
    const tarjeta = selector.closest('article');
    tarjeta.querySelector('[data-perspectiva]').textContent = fuente.perspectiva || 'Perspectiva y propósito pendientes.';
    tarjeta.querySelector('[data-evidencia]').textContent = fuente.evidencia || 'Evidencia y localizador pendientes.';
    tarjeta.querySelector('[data-limites]').textContent = fuente.limites || 'Límites de la fuente pendientes.';
    tarjeta.querySelector('[data-referencia]').textContent = fuente.referencia || 'Referencia completa pendiente.';
  };
  selector.value = selector.dataset.fuente; selector.addEventListener('change', actualizar); actualizar();
});
