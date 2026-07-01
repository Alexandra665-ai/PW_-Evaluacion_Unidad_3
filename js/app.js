const $ = id => document.getElementById(id);

const form = $("mascota-form");
const campos = {
  nombre: $("nombre"),
  tipo: $("tipo"),
  edad: $("edad"),
  ciudad: $("ciudad"),
  email: $("email"),
  confirmarEmail: $("confirmarEmail"),
  telefono: $("telefono"),
  foto: $("foto")
};

const lista = $("lista-contenedor");
const listaVacia = $("lista-vacia");
const buscador = $("buscador");
const filtroTipo = $("filtro-tipo");
const filtroEstado = $("filtro-estado");
const formSection = $("form-section");

const modal = $("modal-adopcion");
const formAdopcion = $("form-adopcion");
let mascotaSeleccionada = "";

let mascotas = JSON.parse(localStorage.getItem("adopta-mascotas")) || [
  { id: 1, nombre: "Toby", tipo: "perro", edad: 2, ciudad: "Iquique", email: "refugio@patitas.cl", telefono: "+56 9 62360223", adoptado: false, foto: "img/toby.jpg" },
  { id: 2, nombre: "Max", tipo: "perro", edad: 5, ciudad: "Alto Hospicio", email: "refugio@patitas.cl", telefono: "+56 9 45762837", adoptado: true, foto: "img/max.jpg" },
  { id: 3, nombre: "Rocky", tipo: "perro", edad: 4, ciudad: "Arica", email: "refugio@patitas.cl", telefono: "+56 9 98384829", adoptado: false, foto: "img/rocky.jpg" },
  { id: 4, nombre: "Mía", tipo: "gato", edad: 3, ciudad: "Pozo Almonte", email: "refugio@patitas.cl", telefono: "+56 9 99384029", adoptado: false, foto: "img/mia.jpg" },
  { id: 5, nombre: "Coco", tipo: "conejo", edad: 2, ciudad: "Iquique", email: "refugio@patitas.cl", telefono: "+56 9 94839274", adoptado: false, foto: "img/coco.jpg" }
];

function guardar() {
  localStorage.setItem("adopta-mascotas", JSON.stringify(mascotas));
}

function error(campo, mensaje) {
  const span = $(`error-${campo}`);
  const input = campos[campo];

  if (span) span.textContent = mensaje;

  if (input) {
    input.classList.toggle("invalido", mensaje !== "");
    input.classList.toggle("valido", mensaje === "");
  }
}

function validar() {
  const emailOk = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(campos.email.value);
  const foto = campos.foto.files[0];

  const errores = {
    nombre: campos.nombre.value.trim().length < 2 ? "Debe tener mínimo 2 caracteres" : "",
    tipo: campos.tipo.value === "" ? "Selecciona un tipo de animal" : "",
    edad: campos.edad.value === "" || campos.edad.value < 0 || campos.edad.value > 25 ? "Edad entre 0 y 25" : "",
    ciudad: campos.ciudad.value.trim().length < 3 ? "Debe tener mínimo 3 caracteres" : "",
    email: !emailOk ? "Formato de email inválido" : "",
    confirmarEmail: campos.confirmarEmail.value !== campos.email.value ? "Los emails no coinciden" : "",
    telefono: campos.telefono.value.trim().length < 8 ? "Debe tener mínimo 8 caracteres" : "",
    foto: foto && !foto.type.startsWith("image/") ? "El archivo debe ser una imagen" : ""
  };

  Object.keys(errores).forEach(campo => error(campo, errores[campo]));
  return Object.values(errores).every(mensaje => mensaje === "");
}

function limpiarFormulario() {
  form.reset();
  Object.keys(campos).forEach(campo => error(campo, ""));
}

$("btn-mostrar-form").addEventListener("click", () => {
  formSection.classList.remove("oculto");
  formSection.scrollIntoView({ behavior: "smooth" });
});

$("btn-cerrar-form").addEventListener("click", () => {
  formSection.classList.add("oculto");
  limpiarFormulario();
});

Object.keys(campos).forEach(campo => {
  campos[campo].addEventListener("input", validar);
  campos[campo].addEventListener("change", validar);
});

form.addEventListener("submit", evento => {
  evento.preventDefault();

  if (!validar()) return;

  const archivo = campos.foto.files[0];

  const publicar = foto => {
    mascotas.push({
      id: Date.now(),
      nombre: campos.nombre.value.trim(),
      tipo: campos.tipo.value,
      edad: Number(campos.edad.value),
      ciudad: campos.ciudad.value.trim(),
      email: campos.email.value.trim(),
      telefono: campos.telefono.value.trim(),
      adoptado: false,
      foto: foto || "img/default.jpg"
    });

    guardar();
    renderizar();
    limpiarFormulario();
    formSection.classList.add("oculto");
    alert("Mascota publicada correctamente.");
  };

  if (archivo) {
    const lector = new FileReader();
    lector.onload = e => publicar(e.target.result);
    lector.readAsDataURL(archivo);
  } else {
    publicar("img/default.jpg");
  }
});

function crearTarjeta(mascota) {
  const tarjeta = document.createElement("div");
  tarjeta.className = `tarjeta ${mascota.adoptado ? "adoptado" : ""}`;

  tarjeta.innerHTML = `
    <img src="${mascota.foto || "img/default.jpg"}" class="tarjeta-foto" alt="Foto de ${mascota.nombre}">
    <div class="tarjeta-info">
      <p class="tarjeta-nombre">${mascota.nombre}</p>
      <p class="tarjeta-detalle">${mascota.tipo} · 🎂 ${mascota.edad} años · 📍 ${mascota.ciudad}</p>
      <p class="tarjeta-contacto">Contacto: ${mascota.email} · ${mascota.telefono}</p>
      <span class="estado ${mascota.adoptado ? "estado-adoptado" : "estado-disponible"}">
        ${mascota.adoptado ? "Adoptado" : "Disponible"}
      </span>
    </div>
    <div class="tarjeta-botones">
      <button class="btn-adoptar">${mascota.adoptado ? "Ya adoptado" : "Adoptar"}</button>
      <button class="btn-eliminar">Quitar publicación</button>
    </div>
  `;

  tarjeta.querySelector(".btn-adoptar").addEventListener("click", () => {
    mascotaSeleccionada = mascota.nombre;
    modal.classList.remove("oculto");
  });

  tarjeta.querySelector(".btn-eliminar").addEventListener("click", () => {
    if (confirm("¿Deseas eliminar esta publicación?")) {
      mascotas = mascotas.filter(item => item.id !== mascota.id);
      guardar();
      renderizar();
    }
  });

  lista.appendChild(tarjeta);
}

function actualizarResumen() {
  $("total-mascotas").textContent = mascotas.length;
  $("total-disponibles").textContent = mascotas.filter(m => !m.adoptado).length;
  $("total-adoptadas").textContent = mascotas.filter(m => m.adoptado).length;
}

function aplicarFiltro(estado) {
  buscador.value = "";
  filtroTipo.value = "todos";
  filtroEstado.value = estado;
  renderizar();
  document.querySelector(".lista-section").scrollIntoView({ behavior: "smooth" });
}

$("total-mascotas").parentElement.addEventListener("click", () => aplicarFiltro("todos"));
$("total-disponibles").parentElement.addEventListener("click", () => aplicarFiltro("disponible"));
$("total-adoptadas").parentElement.addEventListener("click", () => aplicarFiltro("adoptado"));

function renderizar() {
  lista.innerHTML = "";

  const texto = buscador.value.toLowerCase().trim();
  const tipo = filtroTipo.value;
  const estado = filtroEstado.value;

  const filtradas = mascotas.filter(m => {
    const coincideTexto = m.nombre.toLowerCase().includes(texto);
    const coincideTipo = tipo === "todos" || m.tipo === tipo;
    const coincideEstado =
      estado === "todos" ||
      (estado === "adoptado" && m.adoptado) ||
      (estado === "disponible" && !m.adoptado);

    return coincideTexto && coincideTipo && coincideEstado;
  });

  listaVacia.style.display = filtradas.length === 0 ? "block" : "none";
  filtradas.forEach(crearTarjeta);
  actualizarResumen();
}

buscador.addEventListener("input", renderizar);
filtroTipo.addEventListener("change", renderizar);
filtroEstado.addEventListener("change", renderizar);

$("cerrar-modal").addEventListener("click", () => modal.classList.add("oculto"));

formAdopcion.addEventListener("submit", evento => {
  evento.preventDefault();

  const nombre = $("nombreInteresado").value.trim();
  const telefono = $("telefonoInteresado").value.trim();
  const correo = $("correoInteresado").value.trim();

  if (!nombre || !telefono || !correo) {
    alert("Completa todos los datos para enviar la solicitud.");
    return;
  }

  alert(`Solicitud enviada correctamente. El responsable de ${mascotaSeleccionada} se contactará contigo.`);

  formAdopcion.reset();
  modal.classList.add("oculto");
});

guardar();
renderizar();