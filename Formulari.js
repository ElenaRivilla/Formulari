let registerErrorMessage = document.querySelector('.register error');
let nameValid = false;
let emailValid = false;
let tlfValid = false;
let datalistValid = false;
let edadValid = false;
let marcarValid = false;
let radioValid = false;
let generoValid = false;
let elementsWithWhiteColor = [];

document.addEventListener('DOMContentLoaded', function () {
    mostrarRegister();
});

const validarForm = (event) => {
    nameValid = validar("#name", /[A-Z][a-z]+( [A-Z]([.]|[a-z]+))?( [A-Z][a-z]+){1,2}/);
    emailValid = validar("#email", /[a-z]{3,}(\d*|(([._])[a-z]+)?(\3[a-z]+)?)@[a-z]{3,}[.][a-z]{2,4}/);
    tlfValid = validar("#tlf", /^[0-9]{6,14}$/);
    datalistValid = validarDatalist(registerErrorMessage);
    edadValid = validarEdad(registerErrorMessage);
    marcarValid = marcar(registerErrorMessage);
    radioValid = validarRadio(registerErrorMessage);
    generoValid = validarGenero(registerErrorMessage);

    if (!(nameValid && emailValid && tlfValid && datalistValid && edadValid && marcarValid && radioValid && generoValid))
        event.preventDefault();
}

const validar = (selector, regular) => {
    let element = document.querySelector(selector + " input");
    let message = document.querySelector(selector + " error");

    if (element.value.length === 0) {
        element.title = "mandatory";
        message.textContent = "*Campo obligatorio";
        return false;
    }
    if (!regular.test(element.value)) {
        message.textContent = "Campo incorrecto";
        return false;
    }
    message.textContent = "";
    return true;
}

const validarRadio = () => {
    let elements = document.querySelectorAll("#noticias input");
    let message = document.querySelector("#noticias error");

    for (let e = 0; e < elements.length; e++) {
        if (elements[e].checked) {
            message.textContent = "";
            return true;
        }
    }
    message.textContent = "*Campo noticias obligatorias";
    return false;
}

const validarDatalist = () => {
    let input = document.querySelector("#pre");
    let telefonoRegExp = /^\+\d{2,3}$/;

    if (input.value.trim() !== "") {
        if (telefonoRegExp.test(input.value.trim())) {
            return true;
        } else {
            let message = document.querySelector("#tlf error");
            message.textContent = "*Prefijo incorrecto";
            return false;
        }
    } else {
        let message = document.querySelector("#tlf error");
        message.textContent = "*El campo es obligatorio";
        return false;
    }
}
const marcar = () => {
    let elements = document.querySelectorAll("div input[type='checkbox']");
    let marcados = 0;
    for (let e = 0; e < elements.length; e++) {
        if (elements[e].checked) {
            marcados++;
        }
    }
    if (marcados < 2) {
        let errorElement = document.querySelector("#errorCheckbox");
        errorElement.textContent = "*Mínimo dos campos obligatorios";
        return false;
    } else {
        let errorElement = document.querySelector("#errorCheckbox");
        errorElement.textContent = "";
        return true;
    }
}

function validarGenero() {
    let genero = document.querySelector("#genero");
    let message = document.querySelector("#errorGenero");
    if (genero.value === "") {
        message.textContent = "*Campo obligatorio";
        return false;
    } else {
        message.textContent = "";
        return true;
    }
}

function mostrarLogin() {
    document.querySelector("#banner").style.display = 'none';
    document.querySelector('.register').style.display = 'none';
    document.querySelector('.login').style.display = 'block';
    document.querySelector('.login').classList.add('slide-in-left');
    setTimeout(function() {
        document.querySelector('.login').classList.remove('slide-in-left');
        document.querySelector('.register').classList.remove('slide-in-left');
    }, 500);
}

function mostrarRegister() {
    document.querySelector("#banner").style.display = 'block';
    document.querySelector('.login').style.display = 'none';
    document.querySelector('.register').style.display = 'block';
    document.querySelector('#container').classList.add('slide-in-left');
    document.querySelector('.register').classList.add('slide-in-left');
    setTimeout(function() {
        document.querySelector('#container').classList.remove('slide-in-left');
        document.querySelector('.register').classList.remove('slide-in-left');
    }, 500);
}

function validarEdad() {
    let inputFecha = document.getElementById('fechaNacimiento').value;
    let message = document.getElementById("errorFecha");
    let fechaNacimiento = new Date(inputFecha);
    let fechaActual = new Date();
    if (!inputFecha) {
        message.textContent = "*Campo obligatorio";
        return false;
    }
    let edadEnAnios = fechaActual.getFullYear() - fechaNacimiento.getFullYear();
    if (fechaNacimiento.getMonth() > fechaActual.getMonth() || (fechaNacimiento.getMonth() === fechaActual.getMonth() && fechaNacimiento.getDate() > fechaActual.getDate())) {
        edadEnAnios--;
    }

    if (edadEnAnios >= 18) {
        message.textContent = "";
        return true;
    } else {
        message.textContent = "Eres menor";
        return false;
    }
}

document.getElementById('colorRange').addEventListener('input', function () {
    let colorIndex = parseInt(this.value);
    let variableName = '--color-' + colorIndex;
    let color = getComputedStyle(document.documentElement).getPropertyValue(variableName);
    let elements;

    if (elementsWithWhiteColor.length === 0) {
        elements = document.querySelectorAll('*');
        elements.forEach(function(element) {
            let elementColor = getComputedStyle(element).color;
            if (elementColor === 'rgb(255, 255, 255)' || elementColor === '#ffffff') {
                element.style.color = color;
                elementsWithWhiteColor.push(element);
            }
        });
    } else {
        elementsWithWhiteColor.forEach(function(element) {
            element.style.color = color;
        });
    }
    this.style.backgroundColor = color;
});
