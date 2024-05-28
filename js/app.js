// Campos del formualario
const mascotaInput = document.querySelector('#mascota');
const propietarioInput = document.querySelector('#propietario');
const telefonoInput = document.querySelector('#telefono');
const fechaInput = document.querySelector('#fecha');
const horaInput = document.querySelector('#hora');
const sintomasInput = document.querySelector('#sintomas');

// UI
const formulario = document.querySelector('#nueva-cita')
const contenedorCitas = document.querySelector('#citas');

// Clases
class Citas {
    constructor() {
        this.citas = [];
    }
}

class UI{
    imprimirAlerta(mensaje, tipo){
        // Crear el div
        const divMensaje = document.createElement('div');
        divMensaje.classList.add('text-center', 'alert', 'col-12');

        // Si es de tipo error agrega una clase
        if(tipo === 'error') {
            divMensaje.classList.add('alert-danger');
        } else {
            divMensaje.classList.add('alert-success');
        }

        // Mensaje de error
        divMensaje.textContent = mensaje;
        
        // Insertar en el DOM
        document.querySelector('.agregar-cita').appendChild(divMensaje);
        
        // Quitar el alert despues de 3 segundos
        setTimeout( () => {
            divMensaje.remove();
        }, 3000);
    }
}

// Instancias
const administrarCitas = new Citas();
const ui = new UI();

// Objeto con la informacion de la Cita
const citaObj = {
    mascota: '',
    propietario: '',
    telefono: '',
    fecha: '',
    hora:'',
    sintomas: ''
}

// Registrar eventos
eventListeners();

function eventListeners() {
    mascotaInput.addEventListener('input', datosCita);
    propietarioInput.addEventListener('input', datosCita);
    telefonoInput.addEventListener('input', datosCita);
    fechaInput.addEventListener('input', datosCita);
    horaInput.addEventListener('input', datosCita);
    sintomasInput.addEventListener('input', datosCita);

    formulario.addEventListener('submit', nuevaCita);
}


// Funciones
// Almacena los datos en el objeto
function datosCita(e){
    // console.log('Mascota: ', e.target.name);
    citaObj[e.target.name] = e.target.value; // Agrega datos al objeto. 

    console.log(citaObj);
}

// Validar y agrega una nueva cita a la clase de citas
function nuevaCita(e){
    e.preventDefault();

    // Extraer la informacion del objeto de la Cita
    const {mascota, propietario, telefono, fecha, hora, sintomas} = citaObj;

    // Validar
    if(mascota === '' || propietario === '' || telefono === '' || fecha === '' || hora === '' || sintomas === ''){
        // console.log('Todos los campos son obligatorios!!!');
        ui.imprimirAlerta('Todos los campos son obligatorios', 'error');
        return;
    }
}