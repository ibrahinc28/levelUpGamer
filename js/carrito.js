let carrito = [];

const listaProductos = document.querySelector('.row');
const listaCarrito = document.querySelector('#lista-carrito');
const totalPagar = document.querySelector('#total-pagar');

document.addEventListener('DOMContentLoaded', () => {

    carrito = JSON.parse(localStorage.getItem('carrito')) || [];
    dibujarCarritoHTML();
});

listaProductos.addEventListener('click', agregarProducto);
listaCarrito.addEventListener('click', eliminarProducto);

function agregarProducto(e) {
    if (e.target.classList.contains('agregar-carrito')) {
        const productoSeleccionado = e.target.parentElement.parentElement;
        leerDatosProducto(productoSeleccionado);
    }
}

function leerDatosProducto(producto) {
    const infoProducto = {
        id: producto.querySelector('button').getAttribute('data-id'),
        nombre: producto.querySelector('h5').textContent,
        precio: parseInt(producto.querySelector('button').getAttribute('data-precio')),
        imagen: producto.querySelector('.imagen-pequeña').src,
        cantidad: 1,
    };

    const existe = carrito.some(item => item.id === infoProducto.id);

    if (existe) {
        const productos = carrito.map(item => {
            if (item.id === infoProducto.id) {
                item.cantidad++;
                return item;
            } else {
                return item;
            }
        });
        carrito = [...productos];
    } else {
        carrito.push(infoProducto);
    }

    dibujarCarritoHTML();
    sincronizarStorage();
}

function dibujarCarritoHTML() {
    limpiarHTML();

    carrito.forEach(producto => {
        const { id, nombre, precio, cantidad, imagen } = producto;
        const row = document.createElement('tr');
        row.innerHTML = `
            <td>
                <img src="${imagen}" width="50" alt="${nombre}">
            </td>
            <td>${nombre}</td>
            <td>$${precio.toLocaleString('es-CL')}</td>
            <td>${cantidad}</td>
            <td>$${(precio * cantidad).toLocaleString('es-CL')}</td>
            <td>
                <a href="#" class="borrar-producto btn btn-danger btn-sm" data-id="${id}">
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-x-circle-fill" viewBox="0 0 16 16">
                        <path d="M16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0zM5.354 4.646a.5.5 0 1 0-.708.708L7.293 8l-2.647 2.646a.5.5 0 0 0 .708.708L8 8.707l2.646 2.647a.5.5 0 0 0 .708-.708L8.707 8l2.647-2.646a.5.5 0 0 0-.708-.708L8 7.293 5.354 4.646z"/>
                    </svg>
                </a>
            </td>
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
    const total = carrito.reduce((acc, producto) => acc + (producto.precio * producto.cantidad), 0);
    totalPagar.textContent = total.toLocaleString('es-CL');
}

function eliminarProducto(e) {
    if (e.target.closest('.borrar-producto')) {
        const productoElemento = e.target.closest('.borrar-producto');
        const productoId = productoElemento.getAttribute('data-id');
        
        carrito = carrito.filter(producto => producto.id !== productoId);

        dibujarCarritoHTML();
        sincronizarStorage();
    }
}

function sincronizarStorage() {
    localStorage.setItem('carrito', JSON.stringify(carrito));
}