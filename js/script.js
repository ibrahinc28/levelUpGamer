const productos = [
    {imagen: "images/catan.png", codigo:"JM001" , categoria: "Juegos de Mesa",nombre: "Catan", descripcion: "Un clásico juego de estrategia donde los jugadores compiten por colonizar y expandirse en la isla de Catan. Ideal para 3-4 jugadores y perfecto para noches de juego en familia o con amigos.", precio: 29990},

    {imagen: "images/carcassome.png",codigo:"JM002" , categoria: "Juegos de Mesa",nombre: "Carcassonne", descripcion: "Un juego de colocación de fichas donde los jugadores construyen el paisaje alrededor de la fortaleza medieval de Carcassonne. Ideal para 2-5 jugadores y fácil de aprender.", precio: 24990},

    {imagen: "images/controlxbox.png",codigo:"AC001" , categoria: "Accesorios",nombre: "Controlador Inalámbrico Xbox Series X", descripcion: "Ofrece una experiencia de juego cómoda con botones mapeables y una respuesta táctil mejorada. Compatible con consolas Xbox y PC.", precio: 59990},

    {imagen: "images/audifonosHyper.png",codigo:"AC002" , categoria: "Accesorios",nombre: "Auriculares Gamer HyperX Cloud II", descripcion: "Proporcionan un sonido envolvente de calidad con un micrófono desmontable y almohadillas de espuma viscoelástica para mayor comodidad durante largas sesiones de juego.", precio: 79990},
    
    {imagen: "images/pcgamer.png",codigo:"CG001" , categoria: "Computadores Gamers",nombre: "PC Gamer ASUS ROG Strix", descripcion: "Un potente equipo diseñado para los gamers más exigentes, equipado con los últimos componentes para ofrecer un rendimiento excepcional en cualquier juego.", precio: 1299990},
    
    {imagen: "images/playstation5.png",codigo:"CO001" , categoria: "Consolas",nombre: "PlayStation 5", descripcion: "La consola de última generación de Sony, que ofrece gráficos impresionantes y tiempos de carga ultrarrápidos para una experiencia de juego inmersiva.", precio: 549990},
    
    {imagen: "images/sillagamer.png",codigo:"SG001" , categoria: "Sillas Gamers",nombre: "Silla Gamer Secretlab Titan", descripcion: "Diseñada para el máximo confort, esta silla ofrece un soporte ergonómico y personalización ajustable para sesiones de juego prolongadas.", precio: 349990},
    
    {imagen: "images/mouse.png",codigo:"MS001" , categoria: "Mouse",nombre: "Mouse Gamer Logitech G502 HERO", descripcion: "Con sensor de alta precisión y botones personalizables, este mouse es ideal para gamers que buscan un control preciso y personalización.", precio: 49990},

    {imagen: "images/mousepad.png",codigo:"MP001" , categoria: "Mousepad",nombre: "Mousepad Razer Goliathus Extended Chroma", descripcion: "Ofrece un área de juego amplia con iluminación RGB personalizable, asegurando una superficie suave y uniforme para el movimiento del mouse.", precio: 29990},

    {imagen: "images/polera.png",codigo:"PP001" , categoria: "Poleras Personalizadas",nombre: "Polera Gamer Personalizada 'Level-Up'", descripcion: "Una camiseta cómoda y estilizada, con la posibilidad de personalizarla con tu gamer tag o diseño favorito.", precio: 14990}
];


function mostrarProductos(lista) {
    const contenedor = document.getElementById('product-list');
    contenedor.innerHTML = ''; //Limpia el contenedor
    if (lista.length === 0) {
        contenedor.innerHTML = '<p>No se encontraron productos.</p>';
        return; // si no hay productos muestra mensaje y no ejecuta siguiente codigo
    }
    lista.forEach(prod => {
        contenedor.innerHTML += `
            <div class="product-card">
            <img src="${prod.imagen}">
                <h3>${prod.nombre}</h3>
                <p>${prod.descripcion}</p>
                <span class="price">${prod.precio.toLocaleString('es-CL', { style: 'currency', currency: 'CLP' })}</span>
                <button class="btn-comprar" data-id="${prod.codigo}">Comprar</button>
                <button class="btn-añadir" data-id="${prod.codigo}">Añadir al carrito</button>
            </div>
        `;
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


