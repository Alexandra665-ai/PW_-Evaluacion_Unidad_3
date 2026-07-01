
const form = document.getElementById("mascota-form");

const inputNombre = document.getElementById("nombre");
const inputTipo = document.getElementById("tipo");
const inputEdad = document.getElementById("edad");
const inputCiudad = document.getElementById("ciudad");
const inputEmail = document.getElementById("email");
const inputConfirmarEmail = document.getElementById("confirmarEmail");
const inputTelefono = document.getElementById("telefono");
const inputFoto = document.getElementById("foto");

const listaContenedor = document.getElementById("lista-contenedor");
const listaVacia = document.getElementById("lista-vacia");

const buscador = document.getElementById("buscador");
const filtroTipo = document.getElementById("filtro-tipo");
const filtroEstado = document.getElementById("filtro-estado");

const btnMostrarForm = document.getElementById("btn-mostrar-form");
const btnCerrarForm = document.getElementById("btn-cerrar-form");
const formSection = document.getElementById("form-section");

const totalMascotas = document.getElementById("total-mascotas");
const totalDisponibles = document.getElementById("total-disponibles");
const totalAdoptadas = document.getElementById("total-adoptadas");




let listaMascotas = cargarDeLocalStorage();

if (listaMascotas.length === 0) {

    listaMascotas = [

        {
            id:1,
            nombre:"Toby",
            tipo:"perro",
            edad:2,
            ciudad:"Iquique",
            email:"refugio@patitas.cl",
            telefono:"+56 9 1111 1111",
            adoptado:false,
            foto:"img/toby.jpg"
        },

        {
            id:2,
            nombre:"Max",
            tipo:"perro",
            edad:5,
            ciudad:"Alto Hospicio",
            email:"refugio@patitas.cl",
            telefono:"+56 9 2222 2222",
            adoptado:true,
            foto:"img/max.jpg"
        },

        {
            id:3,
            nombre:"Rocky",
            tipo:"perro",
            edad:4,
            ciudad:"Arica",
            email:"refugio@patitas.cl",
            telefono:"+56 9 3333 3333",
            adoptado:false,
            foto:"img/rocky.jpg"
        },

        {
            id:4,
            nombre:"Mía",
            tipo:"gato",
            edad:3,
            ciudad:"Antofagasta",
            email:"refugio@patitas.cl",
            telefono:"+56 9 4444 4444",
            adoptado:false,
            foto:"img/mia.jpg"
        },

        {
            id:5,
            nombre:"Coco",
            tipo:"conejo",
            edad:2,
            ciudad:"Iquique",
            email:"refugio@patitas.cl",
            telefono:"+56 9 5555 5555",
            adoptado:false,
            foto:"img/coco.jpg"
        }

    ];

    guardarEnLocalStorage();

}




function guardarEnLocalStorage(){

    localStorage.setItem(
        "adopta-mascotas",
        JSON.stringify(listaMascotas)
    );

}

function cargarDeLocalStorage(){

    const datos = localStorage.getItem("adopta-mascotas");

    if(datos){

        return JSON.parse(datos);

    }

    return [];

}


//  VALIDACIONES 

function validarNombre(valor){

    if(valor.trim() === ""){
        return "El nombre es obligatorio";
    }

    if(valor.trim().length < 2 || valor.trim().length > 30){
        return "Debe tener entre 2 y 30 caracteres";
    }

    return "";

}

function validarTipo(valor){

    if(valor === ""){
        return "Selecciona un tipo de animal";
    }

    return "";

}

function validarEdad(valor){

    if(valor === ""){
        return "La edad es obligatoria";
    }

    const numero = Number(valor);

    if(isNaN(numero) || numero < 0 || numero > 25){
        return "Debe ser un número entre 0 y 25";
    }

    return "";

}

function validarCiudad(valor){

    if(valor.trim() === ""){
        return "La ciudad es obligatoria";
    }

    if(valor.trim().length < 3){
        return "Debe tener mínimo 3 caracteres";
    }

    return "";

}

function validarEmail(valor){

    if(valor.trim() === ""){
        return "El email es obligatorio";
    }

    const patronEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if(!patronEmail.test(valor)){
        return "Formato de email inválido";
    }

    return "";

}

function validarConfirmarEmail(valor, emailOriginal){

    if(valor.trim() === ""){
        return "Debes confirmar el email";
    }

    if(valor !== emailOriginal){
        return "Los emails no coinciden";
    }

    return "";

}

function validarTelefono(valor){

    if(valor.trim() === ""){
        return "El teléfono es obligatorio";
    }

    if(valor.trim().length < 8){
        return "Debe tener mínimo 8 caracteres";
    }

    return "";

}

function validarFoto(){

    const archivo = inputFoto.files[0];

    if(!archivo){
        return "";
    }

    if(!archivo.type.startsWith("image/")){
        return "El archivo debe ser una imagen";
    }

    return "";

}

function mostrarError(inputElemento, idErrorSpan, mensaje){

    const spanError = document.getElementById(idErrorSpan);

    if(!spanError || !inputElemento){
        return;
    }

    spanError.textContent = mensaje;

    if(mensaje === ""){
        inputElemento.classList.remove("invalido");
        inputElemento.classList.add("valido");
    }else{
        inputElemento.classList.remove("valido");
        inputElemento.classList.add("invalido");
    }

}

function limpiarEstadosFormulario(){

    const campos = [
        inputNombre,
        inputTipo,
        inputEdad,
        inputCiudad,
        inputEmail,
        inputConfirmarEmail,
        inputTelefono,
        inputFoto
    ];

    campos.forEach(function(campo){

        if(campo){
            campo.classList.remove("valido", "invalido");
        }

    });

    document.querySelectorAll(".error-msg").forEach(function(error){
        error.textContent = "";
    });

}

function validarFormularioCompleto(){

    const errorNombre = validarNombre(inputNombre.value);
    const errorTipo = validarTipo(inputTipo.value);
    const errorEdad = validarEdad(inputEdad.value);
    const errorCiudad = validarCiudad(inputCiudad.value);
    const errorEmail = validarEmail(inputEmail.value);
    const errorConfirmar = validarConfirmarEmail(
        inputConfirmarEmail.value,
        inputEmail.value
    );
    const errorTelefono = validarTelefono(inputTelefono.value);
    const errorFoto = validarFoto();

    mostrarError(inputNombre, "error-nombre", errorNombre);
    mostrarError(inputTipo, "error-tipo", errorTipo);
    mostrarError(inputEdad, "error-edad", errorEdad);
    mostrarError(inputCiudad, "error-ciudad", errorCiudad);
    mostrarError(inputEmail, "error-email", errorEmail);
    mostrarError(inputConfirmarEmail, "error-confirmarEmail", errorConfirmar);
    mostrarError(inputTelefono, "error-telefono", errorTelefono);
    mostrarError(inputFoto, "error-foto", errorFoto);

    return !errorNombre &&
           !errorTipo &&
           !errorEdad &&
           !errorCiudad &&
           !errorEmail &&
           !errorConfirmar &&
           !errorTelefono &&
           !errorFoto;

}




btnMostrarForm.addEventListener("click", function(){

    formSection.classList.remove("oculto");

    formSection.scrollIntoView({
        behavior:"smooth"
    });

});

btnCerrarForm.addEventListener("click", function(){

    formSection.classList.add("oculto");

    form.reset();

    limpiarEstadosFormulario();

});

//  VALIDACIÓN EN TIEMPO REAL 

inputNombre.addEventListener("input", function(){
    mostrarError(inputNombre, "error-nombre", validarNombre(inputNombre.value));
});

inputTipo.addEventListener("change", function(){
    mostrarError(inputTipo, "error-tipo", validarTipo(inputTipo.value));
});

inputEdad.addEventListener("input", function(){
    mostrarError(inputEdad, "error-edad", validarEdad(inputEdad.value));
});

inputCiudad.addEventListener("input", function(){
    mostrarError(inputCiudad, "error-ciudad", validarCiudad(inputCiudad.value));
});

inputEmail.addEventListener("input", function(){
    mostrarError(inputEmail, "error-email", validarEmail(inputEmail.value));
});

inputConfirmarEmail.addEventListener("keyup", function(){
    mostrarError(
        inputConfirmarEmail,
        "error-confirmarEmail",
        validarConfirmarEmail(inputConfirmarEmail.value, inputEmail.value)
    );
});

inputTelefono.addEventListener("input", function(){
    mostrarError(inputTelefono, "error-telefono", validarTelefono(inputTelefono.value));
});

inputFoto.addEventListener("change", function(){
    mostrarError(inputFoto, "error-foto", validarFoto());
});




form.addEventListener("submit", function(evento){

    evento.preventDefault();

    if(!validarFormularioCompleto()){
        return;
    }

    const archivo = inputFoto.files[0];

    function guardarMascota(fotoBase64){

        const nuevaMascota = {
            id: Date.now(),
            nombre: inputNombre.value.trim(),
            tipo: inputTipo.value,
            edad: Number(inputEdad.value),
            ciudad: inputCiudad.value.trim(),
            email: inputEmail.value.trim(),
            telefono: inputTelefono.value.trim(),
            adoptado: false,
            foto: fotoBase64 || "img/default.jpg"
        };

        listaMascotas.push(nuevaMascota);

        guardarEnLocalStorage();

        renderizarLista();

        form.reset();

        limpiarEstadosFormulario();

        formSection.classList.add("oculto");

        alert("Mascota publicada correctamente.");

    }

    if(archivo){

        const lector = new FileReader();

        lector.onload = function(e){
            guardarMascota(e.target.result);
        };

        lector.readAsDataURL(archivo);

    }else{

        guardarMascota("img/default.jpg");

    }

});




function obtenerIcono(tipo){

    if(tipo === "perro"){
        return "🐶";
    }

    if(tipo === "gato"){
        return "🐱";
    }

    if(tipo === "conejo"){
        return "🐰";
    }

    if(tipo === "ave"){
        return "🐦";
    }

    return "🐾";

}

function crearTarjeta(mascota){

    const tarjeta = document.createElement("div");
    tarjeta.className = "tarjeta" + (mascota.adoptado ? " adoptado" : "");

    const foto = document.createElement("img");
    foto.src = mascota.foto || "img/default.jpg";
    foto.alt = "Foto de " + mascota.nombre;
    foto.className = "tarjeta-foto";

    const infoDiv = document.createElement("div");
    infoDiv.className = "tarjeta-info";

    const nombreEl = document.createElement("p");
    nombreEl.className = "tarjeta-nombre";
    nombreEl.textContent = mascota.nombre;

    const detalleEl = document.createElement("p");
    detalleEl.className = "tarjeta-detalle";
    detalleEl.textContent = obtenerIcono(mascota.tipo) + " " +
                            mascota.tipo + " · 🎂 " +
                            mascota.edad + " años · 📍 " +
                            mascota.ciudad;

    const contactoEl = document.createElement("p");
    contactoEl.className = "tarjeta-contacto";
    contactoEl.textContent = "Contacto: " + mascota.email + " · " + mascota.telefono;

    const estadoEl = document.createElement("span");
    estadoEl.className = mascota.adoptado ? "estado estado-adoptado" : "estado estado-disponible";
    estadoEl.textContent = mascota.adoptado ? "Adoptado" : "Disponible";

    infoDiv.appendChild(nombreEl);
    infoDiv.appendChild(detalleEl);
    infoDiv.appendChild(contactoEl);
    infoDiv.appendChild(estadoEl);

    const botonesDiv = document.createElement("div");
    botonesDiv.className = "tarjeta-botones";

    const btnAdoptar = document.createElement("button");
    btnAdoptar.className = "btn-adoptar";
    btnAdoptar.textContent = mascota.adoptado ? "Ya adoptado" : "Adoptar";
    btnAdoptar.addEventListener("click", function(){
    abrirModalAdopcion(mascota.nombre);
});

    const btnEliminar = document.createElement("button");
    btnEliminar.className = "btn-eliminar";
    btnEliminar.textContent = "Eliminar";
    btnEliminar.addEventListener("click", function(){
        eliminarMascota(mascota.id);
    });

    botonesDiv.appendChild(btnAdoptar);
    botonesDiv.appendChild(btnEliminar);

    tarjeta.appendChild(foto);
    tarjeta.appendChild(infoDiv);
    tarjeta.appendChild(botonesDiv);

    return tarjeta;

}



function eliminarMascota(id) {

    if (!confirm("¿Deseas eliminar esta publicación?")) {
        return;
    }

    listaMascotas = listaMascotas.filter(function (m) {
        return m.id !== id;
    });

    guardarEnLocalStorage();

    renderizarLista();

}




function actualizarResumen() {

    const total = listaMascotas.length;
    const disponibles = listaMascotas.filter(m => !m.adoptado).length;
    const adoptadas = listaMascotas.filter(m => m.adoptado).length;

    totalMascotas.textContent = total;
    totalDisponibles.textContent = disponibles;
    totalAdoptadas.textContent = adoptadas;

    totalMascotas.parentElement.onclick = function () {

        buscador.value = "";
        filtroTipo.value = "todos";
        filtroEstado.value = "todos";

        renderizarLista();

        document.querySelector(".lista-section").scrollIntoView({
            behavior: "smooth"
        });

    };

    totalDisponibles.parentElement.onclick = function () {

        buscador.value = "";
        filtroTipo.value = "todos";
        filtroEstado.value = "disponible";

        renderizarLista();

        document.querySelector(".lista-section").scrollIntoView({
            behavior: "smooth"
        });

    };

    totalAdoptadas.parentElement.onclick = function () {

        buscador.value = "";
        filtroTipo.value = "todos";
        filtroEstado.value = "adoptado";

        renderizarLista();

        document.querySelector(".lista-section").scrollIntoView({
            behavior: "smooth"
        });

    };

}




function renderizarLista() {

    listaContenedor.innerHTML = "";

    const texto = buscador.value.toLowerCase().trim();

    const tipo = filtroTipo.value;

    const estado = filtroEstado.value;

    const listaFiltrada = listaMascotas.filter(function (mascota) {

        const coincideTexto = mascota.nombre.toLowerCase().includes(texto);

        const coincideTipo =
            tipo === "todos" ||
            mascota.tipo === tipo;

        const coincideEstado =
            estado === "todos" ||
            (estado === "adoptado" && mascota.adoptado) ||
            (estado === "disponible" && !mascota.adoptado);

        return coincideTexto && coincideTipo && coincideEstado;

    });

    if (listaFiltrada.length === 0) {

        listaVacia.style.display = "block";

    } else {

        listaVacia.style.display = "none";

        listaFiltrada.forEach(function (mascota) {

            listaContenedor.appendChild(
                crearTarjeta(mascota)
            );

        });

    }

    actualizarResumen();

}



buscador.addEventListener("input", renderizarLista);

filtroTipo.addEventListener("change", renderizarLista);

filtroEstado.addEventListener("change", renderizarLista);

const modalAdopcion = document.getElementById("modal-adopcion");
const cerrarModal = document.getElementById("cerrar-modal");
const formAdopcion = document.getElementById("form-adopcion");

let mascotaSeleccionada = "";

function abrirModalAdopcion(nombreMascota) {
    mascotaSeleccionada = nombreMascota;
    modalAdopcion.classList.remove("oculto");
}

cerrarModal.addEventListener("click", function(){
    modalAdopcion.classList.add("oculto");
});

formAdopcion.addEventListener("submit", function(evento){
    evento.preventDefault();

    const nombre = document.getElementById("nombreInteresado").value.trim();
    const telefono = document.getElementById("telefonoInteresado").value.trim();
    const correo = document.getElementById("correoInteresado").value.trim();

    if(nombre === "" || telefono === "" || correo === ""){
        alert("Completa todos los datos para enviar la solicitud.");
        return;
    }

    alert(
        "Solicitud enviada correctamente. El responsable de " +
        mascotaSeleccionada +
        " se contactará contigo."
    );

    formAdopcion.reset();
    modalAdopcion.classList.add("oculto");
});
renderizarLista();