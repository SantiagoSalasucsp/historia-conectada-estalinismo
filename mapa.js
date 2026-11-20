"use strict";
const nodos = document.querySelectorAll(".nodo");
const estado = document.querySelector("#relacion-activa");
function destacar(nodo) {
	const numero = nodo.dataset.numero;
	document.querySelectorAll("[data-conexion]").forEach((linea) => {
		linea.classList.toggle(
			"destacada",
			linea.dataset.conexion.split("-").includes(numero),
		);
	});
	estado.textContent = nodo.dataset.relacion;
}
nodos.forEach((nodo) => {
	nodo.addEventListener("mouseenter", () => destacar(nodo));
	nodo.addEventListener("focus", () => destacar(nodo));
});
const desplazamiento = document.querySelector("#mapa-desplazable");
document
	.querySelector("#mover-izquierda")
	.addEventListener("click", () =>
		desplazamiento.scrollBy({ left: -350, behavior: "smooth" }),
	);
document
	.querySelector("#mover-derecha")
	.addEventListener("click", () =>
		desplazamiento.scrollBy({ left: 350, behavior: "smooth" }),
	);
