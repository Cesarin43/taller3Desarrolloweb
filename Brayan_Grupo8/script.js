let ingresos = 0;
let gastos = {};
let categorias = [];
let transacciones = [];

const formularioIngresos = document.getElementById('income-form');
const formularioGastos = document.getElementById('expense-form');
const formularioCategoria = document.getElementById('category-form');
const mostrarSaldo = document.getElementById('balance-display');
const elementoSaldo = document.getElementById('balance');
const elementoAlerta = document.getElementById('warning');
const selectorCategoria = document.getElementById('category');
const historialTransacciones = document.getElementById('transaction-history');
const listaTransacciones = document.getElementById('transactions');

categorias = ['Alimentación', 'Transporte', 'Entretenimiento', 'Vivienda', 'Servicios'];
categorias.forEach((categoria) => {
    const opcion = document.createElement('option');
    opcion.value = categoria;
    opcion.textContent = categoria;
    selectorCategoria.appendChild(opcion);
});

formularioIngresos.addEventListener('submit', (e) => {
    e.preventDefault();
    const valorIngreso = parseFloat(document.getElementById('income').value);
    ingresos += valorIngreso;
    actualizarSaldo();
    agregarTransaccion(`Ingreso: $${valorIngreso.toFixed(2)}`, 'green');
});

formularioGastos.addEventListener('submit', (e) => {
    e.preventDefault();
    const valorGasto = parseFloat(document.getElementById('expense').value);
    const categoria = document.getElementById('category').value;
    if (!gastos[categoria]) {
        gastos[categoria] = 0;
    }
    gastos[categoria] += valorGasto;
    actualizarSaldo();
    agregarTransaccion(`Gasto: $${valorGasto.toFixed(2)} (${categoria})`, 'red');
});

formularioCategoria.addEventListener('submit', (e) => {
    e.preventDefault();
    const nuevaCategoria = document.getElementById('new-category').value;
    categorias.push(nuevaCategoria);
    const opcion = document.createElement('option');
    opcion.value = nuevaCategoria;
    opcion.textContent = nuevaCategoria;
    selectorCategoria.appendChild(opcion);
});

function actualizarSaldo() {
    const totalGastos = Object.values(gastos).reduce((a, b) => a + b, 0);
    const saldo = ingresos - totalGastos;
    elementoSaldo.textContent = `$${saldo.toFixed(2)}`;
    if (saldo < 0) {
        elementoAlerta.textContent = 'Alerta: ¡El saldo es negativo!';
    } else if (saldo < 100) {
        elementoAlerta.textContent = 'Alerta: ¡El saldo es bajo!';
    } else {
        elementoAlerta.textContent = '';
    }
}

function agregarTransaccion(transaccion, color) {
    const elementoTransaccion = document.createElement('li');
    elementoTransaccion.style.color = color;
    elementoTransaccion.textContent = transaccion;
    listaTransacciones.appendChild(elementoTransaccion);
    transacciones.push(transaccion);
}
