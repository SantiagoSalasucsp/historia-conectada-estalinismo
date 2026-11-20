"use strict";
const contenido = window.MODULO;
const panel = document.querySelector("#panel");
function crear(tipo, texto, clase) {
	const elemento = document.createElement(tipo);
	if (texto) elemento.textContent = texto;
	if (clase) elemento.className = clase;
	return elemento;
}
function citas(ids) {
	const bloque = crear("div", "", "citas-sociedad");
	ids.forEach((id) => {
		const enlace = crear("a", "[" + id + "]");
		enlace.href = "#fuente-" + id;
		enlace.setAttribute("aria-label", "Consultar referencia " + id);
		bloque.append(enlace);
	});
	return bloque;
}
function mostrarGrupos() {
	panel.append(
		crear(
			"p",
			"Selecciona un grupo para comparar oportunidades y dificultades.",
			"instruccion-sociedad",
		),
	);
	const botones = crear("div", "", "grupos");
	const ficha = crear("article", "", "ficha-grupo");
	ficha.setAttribute("aria-live", "polite");
	function elegir(indice) {
		const grupo = contenido.grupos[indice];
		botones.querySelectorAll("button").forEach((boton, i) => {
			boton.classList.toggle("elegido", i === indice);
			boton.setAttribute("aria-pressed", String(i === indice));
		});
		ficha.replaceChildren(
			crear("h4", grupo.nombre),
			crear("span", "ACCESO Y OPORTUNIDADES", "etiqueta"),
			crear("p", grupo.oportunidad),
			crear("span", "CARGAS Y RESTRICCIONES", "etiqueta"),
			crear("p", grupo.limite),
		);
	}
	contenido.grupos.forEach((grupo, indice) => {
		const boton = crear("button", grupo.nombre);
		boton.addEventListener("click", () => elegir(indice));
		botones.append(boton);
	});
	panel.append(botones, ficha);
	elegir(0);
}
function mostrarApartado(indice) {
	const apartado = contenido.apartados[indice];
	document.querySelectorAll("[data-apartado]").forEach((boton, i) => {
		boton.classList.toggle("activo", i === indice);
		boton.setAttribute("aria-pressed", String(i === indice));
	});
	panel.replaceChildren(
		crear("span", "0" + (indice + 1), "numero-panel"),
		crear("h3", apartado.titulo),
	);
	if (indice === 3) mostrarGrupos();
	apartado.puntos.forEach(([titulo, texto]) => {
		const articulo = crear("article", "", "punto-sociedad");
		articulo.append(crear("h4", titulo), crear("p", texto));
		panel.append(articulo);
	});
	const idea = crear("aside", "", "idea-sociedad");
	idea.append(
		crear("span", "QUÉ DEBES RECORDAR", "etiqueta"),
		crear("p", apartado.idea),
	);
	panel.append(idea, citas(apartado.fuentes));
}
contenido.apartados.forEach((apartado, indice) => {
	const boton = crear("button", "0" + (indice + 1) + " · " + apartado.titulo);
	boton.dataset.apartado = indice;
	boton.addEventListener("click", () => mostrarApartado(indice));
	document.querySelector("#pestanas").append(boton);
});
const selectores = document.querySelectorAll("[data-fuente]");
function avisarCoincidencia() {
	document.querySelector("#misma-fuente").textContent =
		selectores[0].value === selectores[1].value
			? "Has elegido la misma fuente en ambos lados. Elige otra para contrastarlas."
			: "";
}
selectores.forEach((selector) => {
	contenido.fuentes.forEach((fuente, indice) => {
		const opcion = crear("option", fuente.titulo);
		opcion.value = indice;
		selector.append(opcion);
	});
	function actualizar() {
		const fuente = contenido.fuentes[Number(selector.value)];
		const tarjeta = selector.closest("article");
		["perspectiva", "evidencia", "limites", "referencia"].forEach(
			(campo) =>
				(tarjeta.querySelector("[data-" + campo + "]").textContent =
					fuente[campo]),
		);
	}
	selector.value = selector.dataset.fuente;
	selector.addEventListener("change", () => {
		actualizar();
		avisarCoincidencia();
	});
	actualizar();
});
contenido.referencias.forEach((fuente) => {
	const articulo = crear("article", "", "referencia-sociedad");
	articulo.id = "fuente-" + fuente.id;
	articulo.append(
		crear("span", fuente.id, "numero-panel"),
		crear("p", fuente.texto),
	);
	if (fuente.url) {
		const enlace = crear("a", "Consultar fuente ↗");
		enlace.href = fuente.url;
		enlace.target = "_blank";
		enlace.rel = "noopener noreferrer";
		articulo.append(enlace);
	}
	document.querySelector("#referencias").append(articulo);
});
contenido.otrasLecturas.forEach((texto) =>
	document.querySelector("#otras-lecturas").append(crear("p", texto)),
);
avisarCoincidencia();
mostrarApartado(0);
const botonVideo = document.querySelector("#ver-video");
const zonaVideo = document.querySelector("#reproductor-modulo");
const videoEquipo = document.querySelector("#video-equipo");
botonVideo.addEventListener("click", () => {
	const abrir = zonaVideo.hidden;
	zonaVideo.hidden = !abrir;
	botonVideo.setAttribute("aria-expanded", String(abrir));
	botonVideo.textContent = abrir ? "Cerrar video −" : "▷ Ver video del módulo";
	if (!abrir) videoEquipo.pause();
});
videoEquipo.addEventListener("error", () => {
	document.querySelector("#estado-video").textContent =
		"No se pudo reproducir el archivo. Prueba el enlace para abrirlo por separado.";
});
