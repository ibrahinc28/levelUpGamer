document.getElementById('search-btn').addEventListener('click', () => {
    const query = document.getElementById('search-input').value.toLowerCase();
    const resultados = productos.filter(prod =>
        prod.nombre.toLowerCase().includes(query) ||
        prod.descripcion.toLowerCase().includes(query)
    );
    mostrarProductos(resultados);
});

const productosDestacados = productos.slice(0, 4);

function mostrarProductosHome(lista) {
    const contenedor = document.getElementById('home-product-list');
    contenedor.innerHTML = ''; // Limpia el contenedor

    lista.forEach(prod => {
        const card = document.createElement('div');
        card.className = 'product-home-card';

        const img = document.createElement('img');
        img.src = prod.imagen;
        img.alt = prod.nombre;

        const nombre = document.createElement('h3');
        nombre.textContent = prod.nombre;

        const descripcion = document.createElement('p');
        descripcion.textContent = prod.descripcion;

        const precio = document.createElement('p');
        precio.innerHTML = `<strong>Precio:</strong> ${prod.precio.toLocaleString('es-CL', { style: 'currency', currency: 'CLP' })}`;

        const boton = document.createElement('button');
        boton.className = 'btn-añadir';
        boton.dataset.id = prod.codigo;
        boton.textContent = 'Añadir al carrito';

        // Agregar elementos a la tarjeta
        card.appendChild(img);
        card.appendChild(nombre);
        card.appendChild(descripcion);
        card.appendChild(precio);
        card.appendChild(boton);

        // Agregar tarjeta al contenedor principal
        contenedor.appendChild(card);
    });
}

// Ejecuta para mostrar al cargar la página
mostrarProductosHome(productosDestacados);