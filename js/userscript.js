var nombre = "placeholder"
var snombre = "placeholder"
var appaterno = "placeholder"
var apmaterno = "placeholder"
var correo = "placeholder"
function actualizarDatos(replacetext = String){
    nombre = document.getElementById("nameId").value
    snombre = document.getElementById("secondnameId").value
    appaterno = document.getElementById("apellidopatId").value
    apmaterno = document.getElementById("apellidomatId").value
    correo = document.getElementById("correoId").value

    document.getElementById("nombreUsuario").innerText=nombre+" "+snombre+" "+appaterno+" "+apmaterno
    document.getElementById("perfilCorreo").innerText=correo

    document.getElementById("textbox").value=""
}