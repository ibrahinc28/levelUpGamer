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

const productosDestacados = productos.slice(0, 6);

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

        const enlaceImagen = document.createElement('a');
        enlaceImagen.href = `detalle.html?id=${encodeURIComponent(prod.codigo)}`;

        const img = document.createElement('img');
        img.src = prod.imagen;
        img.alt = prod.nombre;
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

// Ejecuta para mostrar al cargar la página
mostrarProductosHome(productosDestacados);