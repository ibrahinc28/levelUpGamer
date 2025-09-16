// Función para obtener el parámetro "id" de la URL
function getProductoId() {
    const params = new URLSearchParams(window.location.search);
    return params.get('id');
}

// Función para mostrar detalle del producto
function mostrarDetalle(producto) {
const contenedor = document.getElementById('product-detail');
    if (!producto) {
    contenedor.innerHTML = '<p style="text-align:center;">Producto no encontrado.</p>';
    return;
}

contenedor.innerHTML = `
    <h1>${producto.nombre}</h1>
    <img src="${producto.imagen}" alt="${producto.nombre}" />
    <p class="price">${producto.precio.toLocaleString('es-CL', { style: 'currency', currency: 'CLP' })}</p>
    <p class="description">${producto.descripcionLarga || producto.descripcion}</p>
    <button class="btn-base" id="btn-add-cart" data-id="${producto.codigo}">Añadir al carrito</button>
`;
}

// Obtener ID producto de la URL
const productoId = getProductoId();

// Asumiendo que tienes un arreglo global productos con todos los productos
// Por ejemplo, definido en productos-data.js
const producto = productos.find(p => p.codigo === productoId);

// Mostrar detalle
mostrarDetalle(producto);

// Manejar botón "Añadir al carrito"
document.getElementById('product-detail').addEventListener('click', function(e) {
    if (e.target && e.target.id === 'btn-add-cart') {
    const id = e.target.dataset.id;
    const producto = productos.find(p => p.codigo === id);
    if (producto) {
      // Supón que tienes esta función declarada en productos.js para agregar al carrito
    agregarAlCarrito(producto);
    alert(`Producto "${producto.nombre}" añadido al carrito.`);
    }
}
});
