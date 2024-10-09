let transacciones = [];
let categorias = ['Comida', 'Transporte','Entretenimineto','Trabajo'];

function agregarCategoria() {
    const nuevaCategoria = document.getElementById('nuevaCategoria').value;
    if (nuevaCategoria !== '') {
       
        categorias.push(nuevaCategoria);
        actualizarCategorias();
    }
    else{
      alert('Debes de ingresar al menos una letra para insertar una categoria')
    }
}
function actualizarCategorias() {
  const UpdateCategoria = document.getElementById('categoria');
  UpdateCategoria.innerHTML = '';
  categorias.forEach(categoria => {
      const option = document.createElement('option');
      option.value = categoria;
      option.textContent = categoria;
      UpdateCategoria.appendChild(option);   

  });
}

function agregarTransaccion(tipo) {
  const valor = parseFloat(document.getElementById('valor').value);
  const descripcion = document.getElementById('descripcion').value;
  const categoria = document.getElementById('categoria').value;
  const fecha = new Date().toLocaleDateString(); 

  const nuevaTransaccion = {
    tipo,
    valor,
    descripcion,
    categoria,
    fecha
  };


  transacciones.push(nuevaTransaccion);
  calcularBalance();
  actualizarTabla();
  
}


function calcularBalance() {
  const balanceElement = document.getElementById('balance');
  let balance = 0;
  transacciones.forEach(transaccion => {
    balance += transaccion.tipo === 'Ingreso' ? transaccion.valor : -transaccion.valor;
  });
  balanceElement.textContent = `Balance:$${balance.toFixed(2)}`;
  if(balance<0){
    alert("Tu balance esta en negativo, debes de tener mas ingresos");
  }
}


function actualizarTabla() {
  const tabla = document.querySelector('#tabla-transacciones tbody');
  tabla.innerHTML = ''; 

  transacciones.forEach(transaccion => {
    const nuevaFila = document.createElement('tr');
    nuevaFila.innerHTML = `
      <td>${transaccion.tipo}</td>
      <td>$${transaccion.valor.toFixed(2)}</td>
      <td>${transaccion.descripcion}</td>
      <td>${transaccion.categoria}</td>
      <td>${transaccion.fecha}</td>
    `;
    tabla.appendChild(nuevaFila);
  });
}

