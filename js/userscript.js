var nombre = "placeholder"
var snombre = "placeholder"
var tnombre = "placeholder"
var appaterno = "placeholder"
var apmaterno = "placeholder"
var correo = "placeholder"

function actualizarDatos(){
    if ( // Revisa que ninguno de los campos obligatorios esté vacío antes de ejecutar la función; el segundo nombre no es necesario
        document.getElementById("nameId").value != "" && // El nombre no está vacío
        document.getElementById("apellidopatId").value != "" && // El apellido paterno no está vacío
        document.getElementById("apellidomatId").value != "" && // El apellido materno no está vacío
        document.getElementById("correoId").value != "" && // El correo no está vacío
        document.getElementById("terminos").checked == true // Los términos y condiciones están aceptados
        
    )
    { // Actualiza los datos 
        nombre = document.getElementById("nameId").value
        snombre = document.getElementById("secondnameId").value
        tnombre = document.getElementById("thirdnameId").value
        appaterno = document.getElementById("apellidopatId").value
        apmaterno = document.getElementById("apellidomatId").value
        correo = document.getElementById("correoId").value

        // Si hay un segundo y tercer nombre
        if (document.getElementById("thirdnameId").value != "" && document.getElementById("secondnameId").value != "") { 
            document.getElementById("nombreUsuario").innerText=nombre+" "+snombre+" "+tnombre+" "+appaterno+" "+apmaterno
        }
        // Si no hay un tercer nombre, pero sí un segundo nombre
        else if (document.getElementById("thirdnameId").value == "" && document.getElementById("secondnameId").value != "") {
            document.getElementById("nombreUsuario").innerText=nombre+" "+snombre+" "+appaterno+" "+apmaterno
        }
        // Si no hay ni un tercer ni segundo nombre
        else { 
            document.getElementById("nombreUsuario").innerText=nombre+" "+appaterno+" "+apmaterno
        }
        document.getElementById("perfilCorreo").innerText=correo
    }
}

function inicioAdministrador() {
    const correoInput = document.getElementById("correoInicioSesion");
    const contrasenaInput = document.getElementById("contrasenaInicioSesion");
    const correo = correoInput.value.trim();
    const contrasena = contrasenaInput.value.trim();

    // Limpiar validaciones previas
    correoInput.classList.remove("is-invalid");
    contrasenaInput.classList.remove("is-invalid");

    // Validar correo vacío o formato inválido usando propiedades del input
    if (!correoInput.checkValidity()) {
        correoInput.classList.add("is-invalid");
        return; // Detener ejecución para que el usuario corrija
    }

    // Validar contraseña vacía
    if (contrasena === "") {
        contrasenaInput.classList.add("is-invalid");
        return;
    }

    // Validar credenciales correctas
    if (correo === "admin@levelupgamer.cl" && contrasena === "admin123") {
        window.location.href = "modoadmin.html"; // Redirigir si es admin
    } else {
        contrasenaInput.classList.add("is-invalid");
        contrasenaInput.nextElementSibling.textContent = "Correo o contraseña incorrectos.";
    }
}
