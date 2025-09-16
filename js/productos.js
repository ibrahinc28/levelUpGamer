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

        // Crear enlace para imagen
        const enlaceImagen = document.createElement('a');
        enlaceImagen.href = `detalle.html?id=${encodeURIComponent(prod.codigo)}`;

        const img = document.createElement('img');
        img.src = prod.imagen;
        img.alt = prod.nombre || "";
        enlaceImagen.appendChild(img);

        const info = document.createElement('div');
        info.className = 'product-info';

        // Crear enlace para nombre
        const enlaceNombre = document.createElement('a');
        enlaceNombre.href = `detalle.html?id=${encodeURIComponent(prod.codigo)}`;
        enlaceNombre.textContent = prod.nombre;
        enlaceNombre.style.textDecoration = 'none';

        const titulo = document.createElement('h3');
        titulo.appendChild(enlaceNombre);

        const precio = document.createElement('p');
        precio.className = 'product-price';
        precio.textContent = prod.precio.toLocaleString('es-CL', { style: 'currency', currency: 'CLP' });

        const btnGroup = document.createElement('div');
        btnGroup.className = 'btn-group';

        const btnComprar = document.createElement('button');
        btnComprar.classList.add('btn-base', 'btn-comprar');
        btnComprar.dataset.id = prod.codigo;
        btnComprar.textContent = 'Comprar';

        const btnAnadir = document.createElement('button');
        btnAnadir.classList.add('btn-base', 'btn-añadir');
        btnAnadir.dataset.id = prod.codigo;
        btnAnadir.textContent = 'Añadir al carrito';

        btnGroup.appendChild(btnAnadir);
        btnGroup.appendChild(btnComprar);

        info.appendChild(titulo);
        info.appendChild(precio);
        info.appendChild(btnGroup);

        card.appendChild(enlaceImagen);
        card.appendChild(info);

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


