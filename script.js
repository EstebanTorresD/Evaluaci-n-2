
function ingresar(){
    const inputNombre = document.getElementById("nombre");
    const nombre = inputNombre.value.trim();
    const largoNombre = nombre.length;
    const err_nombre = document.getElementById("err-nombre");

    const inputPassword = document.getElementById("password");
    const password = inputPassword.value.trim();
    const inputPassword2 = document.getElementById("verificar_pass");
    const password2 = inputPassword2.value.trim();
    const err_password = document.getElementById("err-password");

    const inputComuna = document.getElementById("comuna");
    const comuna = inputComuna.value.trim();
    const err_comuna = document.getElementById("err-comuna");

    const inputDomicilio = document.getElementById("domicilio");
    const domicilio = inputDomicilio.value.trim();
    const err_domicilio = document.getElementById("err-domicilio");

    const inputTelefono = document.getElementById("telefono");
    const telefono = inputTelefono.value.trim();
    const err_telefono = document.getElementById("err-telefono");

    const inputPagWeb = document.getElementById("pag_web");
    const pag_web = inputPagWeb.value.trim();
    const err_pagina = document.getElementById("err-pagina");
    const err_lista = document.getElementById("err-lista");

    const mensajeResultado = document.getElementById('mensaje-resultado');

    // expresiones regulares obtenidas usando chatgpt
    const validarNombre = /^[A-Za-z]{1,9}\d{1,9}$/;
    const validarUrl = /^(https?:\/\/)?(www\.)?[a-zA-Z0-9-]+(\.[a-zA-Z]{2,})(\/[^\s]*)?$/;
    const validarTelefono = /^(\+?56)?\s?9\d{8}$/;
    const validarPassword = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{3,6}$/;

    valNombre(nombre, validarNombre, largoNombre, err_nombre);
    valPassword(nombre, password, password2, validarPassword, err_password);
    valComuna(comuna, err_comuna);
    valDomicilio(domicilio, err_domicilio);
    valTelefono(telefono, validarTelefono, err_telefono);
    valPagina(pag_web, validarUrl, err_pagina);
    valLista(listaPasatiempos, err_lista);
 
    const errores = document.querySelectorAll('[id^="err-"]');
    let hayErrores = false;
    
    errores.forEach(error => {
        if(error.textContent !== '') {
            hayErrores = true;
        }
    });

    if(!hayErrores) {
        // Crear objeto con los datos del formulario
        const datosUsuario = {
            nombre: nombre,
            password: password,
            direccion: {
                comuna: comuna,
                domicilio: domicilio
            },
            telefono: telefono,
            paginaWeb: pag_web,
            pasatiempos: [...listaPasatiempos] // Copia el array de pasatiempos
        };
        mensajeResultado.textContent = '¡Datos ingresados correctamente!';
        mensajeResultado.className = 'alert alert-success';
        mensajeResultado.style.display = 'block';
    } else {
        mensajeResultado.textContent = 'Por favor corrija los errores antes de continuar';
        mensajeResultado.className = 'alert alert-danger';
        mensajeResultado.style.display = 'block';
    }
}

function valNombre(nombre, validarNombre, largoNombre, err_nombre){
    err_nombre.textContent = "";
    if (nombre === ''){
        err_nombre.textContent = "Debe ingresar un nombre!";
    }else if (validarNombre.test(nombre) === false || largoNombre<5 || largoNombre>10){
        err_nombre.textContent = "El nombre ingresado debe tener un largo entre 5 y 10 caracteres, empezar con una letra y terminar con un número";
    }
}

function valPassword(nombre, password, password2, validarPassword, err_password){
    err_password.textContent = "";
    if(password === ''){
        err_password.textContent = "Debe ingresar una contraseña!";
    }else if(password.toLowerCase().includes(nombre.toLowerCase()) && nombre != ''){
        err_password.textContent = "La contraseña no debe contener el nombre de usuario!";
    }else if(validarPassword.test(password) === false){
        err_password.textContent = "La contraseña debe tener de 3 a 6 caracteres y al menos un digito y una letra!";
    }else if(password != password2){
        err_password.textContent = "La contraseñas no coinciden!";
    }
}

function valComuna(comuna, err_comuna){
    err_comuna.textContent = "";
    if(comuna === ''){
        err_comuna.textContent = "Debe seleccionar una comuna!";
    }
}

function valDomicilio(domicilio, err_domicilio){
    err_domicilio.textContent = "";
    if(domicilio === ''){
        err_domicilio.textContent = "Debe ingresar un domicilio!";
    }
}

function valTelefono(telefono, validarTelefono, err_telefono){
    err_telefono.textContent = "";
    if(telefono === ''){
        err_telefono.textContent = "Debe ingresar un número de teléfono";
    }else if(validarTelefono.test(telefono) === false){
        err_telefono.textContent = "El número de teléfono ingresado no es valido!";
    }
}

function valPagina(pag_web, validarUrl, err_pagina){
    err_pagina.textContent = "";
    if(pag_web === ''){
        err_pagina.textContent = "Debe ingresar una url!";
    }else if(validarUrl.test(pag_web) === false){
        err_pagina.textContent = "La url ingresada no es valida!";
    }
}

function valLista(listaPasatiempos, err_lista){
    err_lista.textContent = "";
    if(listaPasatiempos.length < 2){
        err_lista.textContent = "Debe ingresar al menos dos pasatiempos!";
    }
}

const listaPasatiempos = [];

function ingresarLista(){
    const inputPasatiempo = document.getElementById("pasatiempo");
    const pasatiempo = inputPasatiempo.value.trim();
    const err_pasatiempo = document.getElementById("err-pasatiempo");

    err_pasatiempo.textContent = "";
    if(pasatiempo === ''){
        err_pasatiempo.textContent = "Debe ingresar un pasatiempo!";
    }else if(listaPasatiempos.includes(pasatiempo)){
        err_pasatiempo.textContent = "El pasatiempo ya fue ingresado!";
    }else{
        const ul = document.getElementById("lista");
        const li = document.createElement("li");
        li.innerText = pasatiempo;
        ul.appendChild(li);
        inputPasatiempo.value = "";
        listaPasatiempos.push(pasatiempo);
    }
}


