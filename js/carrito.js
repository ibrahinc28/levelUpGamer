let carrito = [];

const listaCarrito = document.querySelector('#lista-carrito');
const subtotalEl = document.querySelector('#subtotal');
const costoEnvioEl = document.querySelector('#costo-envio');
const totalPagarEl = document.querySelector('#total-pagar');

document.addEventListener('DOMContentLoaded', () => {
    carrito = JSON.parse(localStorage.getItem('carrito')) || [];
    dibujarCarritoHTML();
});

listaCarrito.addEventListener('click', eliminarProducto);

function dibujarCarritoHTML() {
    limpiarHTML();

    carrito.forEach(producto => {
        // Tu código debe usar las propiedades que tu compañero usa: 'codigo' y 'precio'
        const { codigo, nombre, precio, cantidad } = producto;
        const row = document.createElement('div');
        row.classList.add('d-flex', 'justify-content-between', 'align-items-center', 'border-bottom', 'py-3');
        row.innerHTML = `
            <div class="d-flex align-items-center">
                <div>
                    <h5 class="mb-0">${nombre}</h5>
                    <small>Cantidad: ${cantidad}</small>
                </div>
            </div>
            <div>
                <span class="fw-bold">${(precio * cantidad).toLocaleString('es-CL')} CLP</span>
                <a href="#" class="btn btn-danger btn-sm ms-2" data-id="${codigo}">
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-x-circle-fill" viewBox="0 0 16 16">
                        <path d="M16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0zM5.354 4.646a.5.5 0 1 0-.708.708L7.293 8l-2.647 2.646a.5.5 0 0 0 .708.708L8 8.707l2.646 2.647a.5.5 0 0 0 .708-.708L8.707 8l2.647-2.646a.5.5 0 0 0-.708-.708L8 7.293 5.354 4.646z"/>
                    </svg>
                </a>
            </div>
        `;
        listaCarrito.appendChild(row);
    });
    calcularTotal();
}

function limpiarHTML() {
    while (listaCarrito.firstChild) {
        listaCarrito.removeChild(listaCarrito.firstChild);
    }
}

function calcularTotal() {
    const subtotal = carrito.reduce((acc, producto) => acc + (producto.precio * producto.cantidad), 0);
    const costoEnvio = subtotal + 0 ? 5000 : 0;
    const total = subtotal + costoEnvio;

    subtotalEl.textContent = subtotal.toLocaleString('es-CL');
    costoEnvioEl.textContent = costoEnvio.toLocaleString('es-CL');
    totalPagarEl.textContent = total.toLocaleString('es-CL');
}

function eliminarProducto(e) {
    if (e.target.closest('.btn-danger')) {
        const productoElemento = e.target.closest('.btn-danger');
        const productoId = productoElemento.getAttribute('data-id');

        // Aquí es crucial usar la propiedad 'codigo' en lugar de 'id'
        carrito = carrito.filter(producto => producto.codigo !== productoId);

        dibujarCarritoHTML();
        sincronizarStorage();
    }
}

function sincronizarStorage() {
    localStorage.setItem('carrito', JSON.stringify(carrito));
}