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

    agregasCita(cita) {
        this.citas = [...this.citas, cita];

        // console.log(this.citas);
    }

    eliminarCita(id) {
        this.citas = this.citas.filter( cita => cita.id !== id);
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

    imprimirCitas({citas}) {
        // console.log(citas); // Mostrar el arreglo de objetos.

        this.limpiarHTML();

        citas.forEach(cita => {
            const {mascota, propietario, telefono, fecha, hora, sintomas, id} = cita;

            const divCita = document.createElement('div');
            divCita.classList.add('card', 'col-12','col-sm-5','col-md-5','no-padding', 'mb-4');
            divCita.dataset.id = id;

            // Scripting de los elementos de la cita
            const mascotaNombre = document.createElement('div');
            mascotaNombre.classList.add('card-header', 'font-weight-bolder','card-text', 'text-center', 'text-card-header');
            mascotaNombre.textContent = mascota;

            const divDatos = document.createElement('div');
            divDatos.classList.add('card-body');

            const propietarioParrafo = document.createElement('p');
            propietarioParrafo.classList.add('card-text','mb-custom');

            propietarioParrafo.innerHTML = `<span class="font-weight-bolder">Propietario: </span> ${propietario}`;

            const telefonoParrafo = document.createElement('p');
            telefonoParrafo.classList.add('card-text','mb-custom');

            telefonoParrafo.innerHTML = `<span class="font-weight-bolder">Teléfono: </span> ${telefono}`;

            const fechaParrafo = document.createElement('p');
            fechaParrafo.classList.add('card-text','mb-custom');

            fechaParrafo.innerHTML = `<span class="font-weight-bolder">Fecha: </span> ${fecha}`;

            const horaParrafo = document.createElement('p');
            horaParrafo.classList.add('card-text','mb-custom');

            horaParrafo.innerHTML = `<span class="font-weight-bolder">Hora: </span> ${hora}`;

            const sintomasParrafo = document.createElement('p');
            sintomasParrafo.classList.add('card-text','mb-custom');

            sintomasParrafo.innerHTML = `<span class="font-weight-bolder">Síntomas: </span> ${sintomas}`;

            // Contenedor de Botones
            const divBotones = document.createElement('div');
            divBotones.classList.add('card-footer', 'd-flex','justify-content-between');

            // Boton para eliminar esta Cita    
            const btnEliminarCita = document.createElement('button');
            btnEliminarCita.classList.add('btn', 'btn-danger', 'mr-2');
            btnEliminarCita.innerHTML = 'Eliminar Cita';

            // Funcion para eliminar esta Cita
            btnEliminarCita.onclick = () => {
                eliminarCita(id);
            }

            // Agregar los parrafos al divCita
            divCita.appendChild(mascotaNombre);
            divDatos.appendChild(propietarioParrafo);
            divDatos.appendChild(telefonoParrafo);
            divDatos.appendChild(fechaParrafo);
            divDatos.appendChild(horaParrafo);
            divDatos.appendChild(sintomasParrafo);

            divBotones.appendChild(btnEliminarCita);

            divCita.appendChild(divDatos);
            divCita.appendChild(divBotones);



            // Agregar las al DOM
            contenedorCitas.appendChild(divCita);

            
        });
    }

    limpiarHTML() {
        while(contenedorCitas.firstChild) {
            contenedorCitas.removeChild(contenedorCitas.firstChild);
        }
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

    // Generar un id unico
    citaObj.id = Date.now();

    // Crear una nueva Cita
    administrarCitas.agregasCita({...citaObj});

    // Reiniciar el objeto para la validacion
    reiniciarObjeto();


    // Reiniciar formulario
    formulario.reset();

    // Imprimir en el HTML las citas
    ui.imprimirCitas(administrarCitas);
}

// Reiniciar el objeto
function reiniciarObjeto() {
    // Reiniciar el objeto
    citaObj.mascota = '';
    citaObj.propietario = '';
    citaObj.telefono = '';
    citaObj.fecha = '';
    citaObj.hora = '';
    citaObj.sintomas = '';
}

function eliminarCita(id) {
    // console.log('Cita a eliminar:  ', id);

    // Eliminar la Cita
    administrarCitas.eliminarCita(id);

    // Muestra el mensaje
    ui.imprimirAlerta('La Cita se ha eliminado correctamente', 'exito');


    // Refrescar citas
    ui.imprimirCitas(administrarCitas);
}