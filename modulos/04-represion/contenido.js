window.MODULO = {
	numero: 4,
	apartados: [
		{
			titulo: "Mecanismos de control",
			descripcion:
				"El control no dependía de una sola institución: combinaba censura, vigilancia y castigo. Selecciona un mecanismo para ver su efecto.",
			tipo: "mecanismos",
		},
		{
			titulo: "Propaganda y cultura",
			descripcion:
				"La propaganda difundía la imagen que el régimen quería construir; la censura restringía las voces que podían cuestionarla.",
			tipo: "propaganda",
		},
		{
			titulo: "Episodios de represión",
			descripcion:
				"Abre un caso para relacionar las decisiones del Estado con sus consecuencias humanas.",
			tipo: "casos",
		},
		{
			titulo: "Consecuencias y cifras",
			descripcion:
				"La represión alcanzó a dirigentes, trabajadores, campesinos, artistas y comunidades enteras.",
			tipo: "consecuencias",
		},
	],
	mecanismos: [
		{
			titulo: "Censura · Glavlit",
			accion:
				"Revisión y prohibición de publicaciones; restricciones a la circulación de obras e ideas.",
			efecto:
				"Limitaba la crítica y condicionaba lo que la población podía leer y discutir.",
			fuentes: ["R1"],
		},
		{
			titulo: "Pasaportes y propiska",
			accion:
				"El pasaporte interno y el registro de residencia regulaban la movilidad y el acceso a determinadas ciudades.",
			efecto:
				"Restringían los desplazamientos y podían convertir la falta de documentación en motivo de detención o expulsión.",
			fuentes: ["R2"],
		},
		{
			titulo: "NKVD y troikas",
			accion:
				"La policía política efectuaba detenciones. Las troikas eran comisiones de tres miembros que dictaban condenas por procedimientos extrajudiciales.",
			efecto:
				"Facilitaban condenas rápidas sin las garantías de un juicio justo. La orden 00447 de 1937 organizó una de las operaciones masivas.",
			fuentes: ["R3", "R4"],
		},
		{
			titulo: "Gulag y deportaciones",
			accion:
				"Encarcelamiento en campos de trabajo forzado y traslado obligatorio de personas y comunidades.",
			efecto:
				"Separación de familias, pérdida de libertad y muertes por violencia, hambre, enfermedad y agotamiento.",
			fuentes: ["R1", "R2"],
		},
	],
	propaganda: [
		{
			titulo: "Construir una imagen oficial",
			texto:
				"La propaganda presentaba al régimen y al liderazgo de Stalin como guías de la transformación soviética. El arte y los medios se orientaban hacia los objetivos del partido.",
			fuentes: ["R1"],
		},
		{
			titulo: "Dirigir la producción cultural",
			texto:
				"El realismo socialista fue promovido como modelo artístico oficial. Escritores y artistas debían ajustarse a las orientaciones políticas, bajo riesgo de censura y persecución.",
			fuentes: ["R1"],
		},
		{
			titulo: "Propaganda y censura se complementaban",
			texto:
				"Una difundía los mensajes autorizados; la otra limitaba las alternativas. La presión institucional también podía llevar a la autocensura.",
			fuentes: ["R1"],
		},
	],
	casos: [
		{
			fecha: "1932–1933",
			titulo: "Hambruna y Holodomor",
			texto:
				"Las requisas de grano y otras políticas estatales agravaron una hambruna que afectó a varias regiones soviéticas. En Ucrania, el Holodomor estuvo acompañado por restricciones a la salida de campesinos de las zonas afectadas.",
			relacion:
				"Políticas coercitivas y restricciones de movilidad → agravamiento del hambre y de las pérdidas humanas.",
			fuentes: ["R1"],
		},
		{
			fecha: "1933",
			titulo: "La isla de Nazino",
			texto:
				"Miles de personas fueron deportadas a una isla siberiana sin medios suficientes de subsistencia. El hambre, las enfermedades y la violencia provocaron una elevada mortalidad.",
			relacion:
				"Detenciones y deportación improvisada → abandono y muerte de personas trasladadas.",
			fuentes: ["R2"],
		},
		{
			fecha: "1934",
			titulo: "El asesinato de Serguéi Kírov",
			texto:
				"Kírov era un dirigente destacado del partido en Leningrado. Su asesinato fue utilizado para ampliar la persecución de supuestos conspiradores.",
			relacion:
				"Un asesinato político usado como justificación → ampliación de la persecución.",
			fuentes: ["R1", "R4"],
		},
		{
			fecha: "1936–1938",
			titulo: "Gran Purga y Juicios de Moscú",
			texto:
				"Los procesos contra antiguos dirigentes bolcheviques coincidieron con una represión que alcanzó a sectores mucho más amplios. En 1937–1938, las operaciones del NKVD multiplicaron las detenciones y ejecuciones.",
			relacion:
				"Acusaciones políticas, procedimientos sumarios y operaciones masivas → terror dentro y fuera del partido.",
			fuentes: ["R1", "R3", "R4"],
		},
		{
			fecha: "1940",
			titulo: "La masacre de Katyn",
			texto:
				"El NKVD ejecutó a prisioneros polacos, incluidos oficiales y miembros de la intelectualidad. Las ejecuciones ocurrieron en varios lugares, no únicamente en el bosque de Katyn.",
			relacion:
				"Control de prisioneros tras la ocupación soviética → asesinatos organizados por el Estado.",
			fuentes: ["R5"],
		},
		{
			fecha: "1944",
			titulo: "Deportaciones de comunidades",
			texto:
				"Chechenos, ingusetios y tártaros de Crimea, entre otros pueblos, fueron deportados bajo acusaciones colectivas de colaboración con el enemigo. Los traslados forzosos y el exilio causaron sufrimiento y muertes.",
			relacion:
				"Atribución de culpa a una comunidad entera → expulsión y desarraigo.",
			fuentes: ["R1"],
		},
	],
	consecuencias: [
		[
			"Políticas",
			"La eliminación de opositores reales o supuestos reforzó el poder de Stalin y debilitó la posibilidad de disentir.",
		],
		[
			"Sociales",
			"Las detenciones y deportaciones rompieron vínculos familiares y comunitarios y extendieron el miedo.",
		],
		[
			"Culturales",
			"La censura y la persecución limitaron la libertad de creación y el debate público.",
		],
	],
	cifras: {
		dato: "≈ 680 000",
		etiqueta: "ejecuciones registradas en 1937–1938",
		nota: "La cifra se refiere a ejecuciones documentadas durante esos dos años; no es el total de víctimas del estalinismo.",
		fuentes: ["R6"],
	},
	referencias: [
		{
			id: "R1",
			texto:
				"Library of Congress. (s. f.). Internal Workings of the Soviet Union. En Revelations from the Russian Archives. Apartados sobre censura, policía política, Gulag, hambruna y deportaciones.",
			url: "https://loc.gov/exhibits/archives/intn.html",
		},
		{
			id: "R2",
			texto:
				"Centro Internacional para la Promoción de los Derechos Humanos (CIPDH). (s. f.). Memorial de la Isla Nazino.",
			url: "https://www.cipdh.gob.ar/memorias-situadas/lugar-de-memoria/memorial-de-la-isla-nazino/",
		},
		{
			id: "R3",
			texto:
				"NKVD. (1937, 30 de julio). Orden operativa n.º 00447. Reproducción digital en Internet Archive, registro aportado en el documento del equipo.",
			url: "https://archive.org/details/018_20190709",
		},
		{
			id: "R4",
			texto:
				"Fernández García, A. (2002). Sobre el terror estalinista: la documentación desclasificada. Cuadernos de Historia Contemporánea, 24.",
			url: "https://revistas.ucm.es/index.php/CHCO/article/view/CHCO0202110301A",
		},
		{
			id: "R5",
			texto:
				"National Archives and Records Administration. (s. f.). Katyn Forest Massacre. Documentos y contexto sobre la ejecución de prisioneros polacos en 1940.",
			url: "https://www.archives.gov/research/foreign-policy/katyn-massacre",
		},
		{
			id: "R6",
			texto:
				"Werth, N. (2006). Les « opérations de masse » de la « Grande terreur » en URSS (1937–1938). Bulletin de l’Institut d’histoire du temps présent, 86, 6–33.",
			url: "https://www.persee.fr/doc/ihtp_0247-0101_2006_num_86_1_1839",
		},
	],
	lecturasEquipo: [
		"Florentín, M. (2023). Escritores y artistas bajo el comunismo: Censura, represión, muerte. Arzalia Ediciones.",
		"Letkemann, P. (1998). Mennonite Victims of “The Great Terror,” 1936–1938. Journal of Mennonite Studies, 16, 33–58.",
		"Kuromiya, H. (2007). Why the Destruction of Orthodox Priests in the Soviet Union in 1937–38? Jahrbücher für Geschichte Osteuropas, 55(1), 86–93. https://www.jstor.org/stable/41051811",
		"Gorlizki, Y., y Khlevniuk, O. (2006). Stalin and his circle. En The Cambridge History of Russia (pp. 243–267). https://doi.org/10.1017/CHOL9780521811446.011",
	],
};
