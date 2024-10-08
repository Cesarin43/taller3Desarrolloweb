let ingresos = 0;
let gastos = {};
let categorias = [];
let transacciones = [];

const ingresosForm = document.getElementById('formulario-de-ingresos');
const gastosForm = document.getElementById('formulario-de-gastos');
const categoriasForm = document.getElementById('form-categoria');
const saldoMostrar = document.getElementById('saldo-mostrar');
const saldoElement = document.getElementById('balance');
const advertencia = document.getElementById('warning');
const categoriasSeleccionar = document.getElementById('caegoria');
const transaccionHistorial = document.getElementById('historial-de-transacciones');
const transaccionLista = document.getElementById('transacciones');

ingresosForm.addEventListener('submit', (e) => {
    e.preventDefault
    const valorIngreso = parseFloat(document.getElementById('ingreso').value);
    ingresos += valorIngreso;
    actualizarSaldo();
    agregarTransaccion(`Ingreso: $${valorIngreso.toFixed(2)}`, 'green')
});

gastosForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const valorGasto = parseFloat(document.getElementById('gasto').value);
    const categoria = document.getElementById('categoria').value;
    if(!gastos[categoria]){
        gastos[categoria] = 0;
    }
    gastos[categoria] += valorGasto;
    actualizarSaldo();
    agregarTransaccion(`Gasto: $${valorGasto.toFixed(2)} (${categoria})`, 'red');
});

categoriasForm.addEventListener('submit',(e)=>{
    e.preventDefault();
    const nuevaCategoria = document.getElementById('nueva-categoria').value;
    categorias.push(nuevaCategoria);
    const opcion = document.createElement('opcion');
    opcion.value = nuevaCategoria;
    opcion.textContent = nuevaCategoria;
    categoriasSeleccionar.appendChild(opcion);
})

function actualizarSaldo() {
    const totalGastos = Object.values(gastos).reduce((a,b) => a+b,0);
    const saldo = ingresos - totalGastos;
    saldoElement.textContent = `$${saldo.toFixed(2)}`;
    if (saldo < 0) {
        advertencia.textContent = 'Advertencia: Saldo negativo!';
    } else if (balance < 1000) {
        advertencia.textContent = 'Advertencia: Saldo bajo!';
    } else {
        advertencia.textContent = '';
    }
}

function agregarTransaccion(transaccion, color) {
    const transaccionElement = document.createElement('li');
    transaccionElement.style.color = color;
    transaccionElement.textContent = transaccion;
    transaccionLista.appendChild(transaccionElement);
    transacciones.push(transaccion);
}

categorias = ['Comida', 'Transporte', 'Entretenimiento', 'Hogar', 'Extras'];
categorias.forEach((categoria) => {
    const option = document.createElement('opcion');
    option.value = categoria;
    option.textContent = categoria;
    categoriasSeleccionar.appendChild(option);
});