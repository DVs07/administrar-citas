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

let editando;

// Clases
class Citas {
    constructor() {
        this.citas = [];
    }

    agregarCita(cita) {
        this.citas = [...this.citas, cita];
    }

    eliminarCita(id) {
        this.citas = this.citas.filter( cita => cita.id !== id);
    }
    editarCita(citaActualizada){
        this.citas = this.citas.map( cita => cita.id === citaActualizada.id ? citaActualizada : cita); // Se usa el operador ternario, para que se actualice la informacion de la Cita.
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
        // Insertar entre dos elementos HTML
        document.querySelector('#administra').insertBefore(divMensaje, document.querySelector('h2').nextSibling);
        
        // Quitar el alert despues de 3 segundos
        setTimeout( () => {
            divMensaje.remove();
        }, 3000);
    }

    imprimirCitas({citas}) {

        this.limpiarHTML();

        citas.forEach(cita => {
            const {mascota, propietario, telefono, fecha, hora, sintomas, id} = cita;

            const divCita = document.createElement('div');
            divCita.classList.add('card', 'col-12','col-sm-5','col-md-5','no-padding', 'mt-3');
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

            // Boton para eliminar Cita    
            const btnEliminarCita = document.createElement('button');
            btnEliminarCita.classList.add('btn', 'btn-danger', 'mr-2');
            btnEliminarCita.innerHTML = 'Eliminar Cita';


            // Boton para editar Cita
            const btnEditarCita = document.createElement('button');
            btnEditarCita.classList.add('btn', 'btn-info');
            btnEditarCita.innerHTML = 'Editar Cita';
            btnEditarCita.dataset.editarCita = id;

            btnEditarCita.onclick = () => cargarEdicion(cita);

            // Funcion para eliminar esta Cita
            btnEliminarCita.onclick = () => {
                eliminarCita(id);
            }

            // Card Header
            divCita.appendChild(mascotaNombre);

            // Card Body
            divDatos.appendChild(propietarioParrafo);
            divDatos.appendChild(telefonoParrafo);
            divDatos.appendChild(fechaParrafo);
            divDatos.appendChild(horaParrafo);
            divDatos.appendChild(sintomasParrafo);

            // Card Footer
            divBotones.appendChild(btnEliminarCita);
            divBotones.appendChild(btnEditarCita);

            // Card
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

        ui.imprimirAlerta('Todos los campos son obligatorios', 'error');
        return;
    } 

    if(editando){
        // console.log('Editando');
        ui.imprimirAlerta('Cita Actualizada Correctamente', 'exito');

        // Pasar el objeto de la Cita a edicion
        administrarCitas.editarCita({...citaObj});

        // Regresar el texto del boton a su estado original
        formulario.querySelector('button[type="submit"]').textContent = 'Crear Cita';

        // Quitamos el modo edicion
        editando = false;

    } else{

            // Generar un id unico
        citaObj.id = Date.now();

        // Crear una nueva Cita
        administrarCitas.agregarCita({...citaObj});

        // Mostrar mensaje de agregado correctamente
        ui.imprimirAlerta('Cita Agregada Correctamente', 'exito');
    }



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

// Carga los datos y el modo edicion
function cargarEdicion(cita) {

    const {mascota, propietario, telefono, fecha, hora, sintomas, id} = cita;

    // Llenar los Inputs
    mascotaInput.value = mascota;
    propietarioInput.value = propietario;
    telefonoInput.value = telefono;
    fechaInput.value = fecha;
    horaInput.value = hora;
    sintomasInput.value = sintomas;

    // Llenar el objeto
    citaObj.mascota = mascota;
    citaObj.propietario = propietario;
    citaObj.telefono = telefono;
    citaObj.fecha = fecha;
    citaObj.hora = hora;
    citaObj.sintomas = sintomas;
    citaObj.id = id;


    // Cambiar el texto del boton
    formulario.querySelector('button[type="submit"]').textContent = 'Guardar Cambios';

    editando = true;
}