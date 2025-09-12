function mostrarProductos(lista) {
    const contenedor = document.getElementById('product-list');
    contenedor.innerHTML = '';
    if (lista.length === 0) {
        const mensaje = document.createElement('p');
        mensaje.textContent = "No se encontraron productos.";
        contenedor.appendChild(mensaje);
        return;
    }
    lista.forEach(prod => {
        const card = document.createElement('div');
        card.className = 'product-card';

        const img = document.createElement('img');
        img.src = prod.imagen;
        img.alt = prod.nombre || "";

        const nombre = document.createElement('h3');
        nombre.textContent = prod.nombre;

        const descripcion = document.createElement('p');
        descripcion.textContent = prod.descripcion;

        const precio = document.createElement('span');
        precio.className = 'price';
        precio.textContent = prod.precio.toLocaleString('es-CL', { style: 'currency', currency: 'CLP' });

        const btnComprar = document.createElement('button');
        btnComprar.className = 'btn-comprar';
        btnComprar.dataset.id = prod.codigo;
        btnComprar.textContent = 'Comprar';

        const btnAnadir = document.createElement('button');
        btnAnadir.className = 'btn-añadir';
        btnAnadir.dataset.id = prod.codigo;
        btnAnadir.textContent = 'Añadir al carrito';

        card.appendChild(img);
        card.appendChild(nombre);
        card.appendChild(descripcion);
        card.appendChild(precio);
        card.appendChild(btnComprar);
        card.appendChild(btnAnadir);

        contenedor.appendChild(card);
    });
}


document.getElementById('product-list').addEventListener('click', function(event) {
    if (event.target.classList.contains('btn-añadir')) {
    const id = event.target.getAttribute('data-id');
    const producto = productos.find(p => p.codigo === id);
    if (producto) {
        agregarAlCarrito(producto);
        alert(`Producto "${producto.nombre}" añadido al carrito.`);
        }
    }

    if (event.target.tagName === 'IMG') {
        const modal = document.getElementById('modal-img');
        const modalImg = document.getElementById('modal-img-src');
        modal.style.display = "block";
        modalImg.src = event.target.src;
        modalImg.alt = event.target.alt || "Imagen ampliada";
    }
});

document.getElementById('modal-close').addEventListener('click', function(){
    document.getElementById('modal-img').style.display = "none";
});

// También cerrar modal si se hace clic fuera de la imagen
window.addEventListener('click', function(event) {
        const modal = document.getElementById('modal-img');
        if (event.target === modal) {
        modal.style.display = "none";
    }
});

document.addEventListener('click', function(event) {
    if (event.target.classList.contains('btn-comprar')) {
    const productId = event.target.getAttribute('data-id');
        alert(`Producto ${productId} agregado al carrito.`);
    }
});

function agregarAlCarrito(producto) {
    let carrito = JSON.parse(localStorage.getItem('carrito')) || [];
    const existe = carrito.find(p => p.codigo === producto.codigo);
    if (existe) {
    existe.cantidad = (existe.cantidad || 1) + 1;
        } else {
    carrito.push({ ...producto, cantidad: 1 });
    }
    localStorage.setItem('carrito', JSON.stringify(carrito));
}


mostrarProductos(productos);


document.getElementById('search-btn').addEventListener('click', () => {
    const query = document.getElementById('search-input').value.toLowerCase();
    const resultados = productos.filter(prod =>
        prod.nombre.toLowerCase().includes(query) ||
        prod.descripcion.toLowerCase().includes(query)
    );
    mostrarProductos(resultados);
});


