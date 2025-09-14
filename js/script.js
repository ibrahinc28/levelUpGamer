document.getElementById('search-btn').addEventListener('click', () => {
    const query = document.getElementById('search-input').value.toLowerCase();
    if (!query) {
        mostrarProductosHome(productosDestacados);
        return;
    }
    const resultados = productos.filter(prod =>
        prod.nombre.toLowerCase().includes(query) ||
        prod.descripcion.toLowerCase().includes(query)
    );
    mostrarProductosHome(resultados);
});

// Buscar al presionar Enter
document.getElementById('search-input').addEventListener('keydown', (e) => {
    if(e.key === 'Enter'){
        document.getElementById('search-btn').click();
    }
});

const productosDestacados = productos.slice(0, 4);

function mostrarProductosHome(lista) {
    const contenedor = document.getElementById('home-product-list');
    contenedor.innerHTML = ''; // Limpia el contenedor

    if(lista.length === 0){
        contenedor.textContent = 'No se encontraron productos.';
        return;
    }

    const fragment = document.createDocumentFragment();

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

        // Agregar tarjeta al fragmento de dom
        fragment.appendChild(card);
    });

    //agrega el fragmento al contenedor 
    contenedor.appendChild(fragment);
}

// Ejecuta para mostrar al cargar la página
mostrarProductosHome(productosDestacados);