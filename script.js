/* =========================
   CARRITO JOYAS
========================= */

let carrito = [];
let total = 0;

function agregarAlCarrito(nombre, precio) {
    carrito.push({ nombre, precio });
    total += precio;
    actualizarCarrito();

    const carritoEl = document.getElementById("carrito");
    if (carritoEl) {
        carritoEl.scrollIntoView({ behavior: "smooth" });
    }
}

function actualizarCarrito() {
    const lista = document.getElementById("lista-carrito");
    const totalElemento = document.getElementById("total");
    const cartCount = document.getElementById("cartCount");

    if (!lista || !totalElemento) return;

    lista.innerHTML = "";

    carrito.forEach((producto, index) => {
        const li = document.createElement("li");
        li.innerHTML = `
            <span>${producto.nombre} - $${producto.precio}</span>
            <button onclick="eliminarProducto(${index})">X</button>
        `;
        lista.appendChild(li);
    });

    if (carrito.length === 0) {
        lista.innerHTML = `<li><span>Tu carrito está vacío.</span></li>`;
    }

    totalElemento.textContent = total;

    if (cartCount) {
        cartCount.textContent = carrito.length;
    }
}
function seguirComprando() {
    const cartDropdown = document.getElementById("cartDropdown");
    if (cartDropdown) {
        cartDropdown.classList.remove("open");
    }

    const productos = document.getElementById("productos");
    if (productos) {
        productos.scrollIntoView({ behavior: "smooth" });
    }
}

function eliminarProducto(index) {
    if (!carrito[index]) return;

    total -= carrito[index].precio;
    carrito.splice(index, 1);
    actualizarCarrito();
}

function enviarWhatsApp() {
    if (carrito.length === 0) {
        alert("Tu carrito está vacío.");
        return;
    }

    let mensaje = "Hola! Quiero comprar:\n";

    carrito.forEach(producto => {
        mensaje += `- ${producto.nombre} ($${producto.precio})\n`;
    });

    mensaje += `\nTotal: $${total}`;

    const numero = "56923770543";
    const url = `https://wa.me/${numero}?text=${encodeURIComponent(mensaje)}`;

    window.open(url, "_blank");
}

function enviardia(dia) {
    const numero = "56998920489";
    const mensaje = `Hola! Quiero agendar una perforación para el día ${dia}. ¿Está disponible?`;
    const url = `https://wa.me/${numero}?text=${encodeURIComponent(mensaje)}`;
    window.open(url, "_blank");
}

function enviarconsulta(perforaciones) {
    const numero = "56998920489";
    const mensaje = `Hola! Quiero consultar por tipos de ${perforaciones}`;
    const url = `https://wa.me/${numero}?text=${encodeURIComponent(mensaje)}`;
    window.open(url, "_blank");
}

/* =========================
   CAMBIO DE IMAGEN PRODUCTO
========================= */

function cambiarImagen(boton, direccion) {
    const img = boton.parentElement.querySelector(".producto-img");

    if (!img || !img.dataset.images) return;

    const imagenes = img.dataset.images.split(",");
    let index = parseInt(img.dataset.index || 0);

    index += direccion;

    if (index < 0) index = imagenes.length - 1;
    if (index >= imagenes.length) index = 0;

    img.src = imagenes[index];
    img.dataset.index = index;
}



/* =========================
   FILTROS + FRASE + IMAGEN + TIPO
========================= */

document.addEventListener("DOMContentLoaded", function () {
    const filtrosCategoria = document.querySelectorAll(".filtro");
    const filtrosTipo = document.querySelectorAll(".filtro-tipo");
    const cards = document.querySelectorAll(".card");
    const frase = document.getElementById("fraseCategoria");
    const imagen = document.getElementById("imagenCategoria");
    const descripcion = document.getElementById("descripcionCategoria");

    let categoriaActiva = "todos";
    let tipoActivo = "todos";

    const contenidoCategoria = {
        todos: {
            frase: "Amuletos que cuentan historias",
            imagen: "cat-todos.png",
            descripcion:"Juana de Arco no pidió permiso, eligió su voz y el fuego la volvió eterna.",
        },
        conviccion: {
            frase: "La fuerza que te sostiene",
            imagen: "cat-conviccion.png",
            descripcion:"Cuando el mundo duda,queda lo único que no se negocia: tu verdad.",
            
        },
        transformacion: {
            frase: "El cambio que te define",
            imagen: "cat-transformacion.png",
            descripcion:"Transformarse no es perderse, es ser más fiel que nunca a ti",
        },
        templanza: {
            frase: "No respondió al caos con más caos.Respondió con templanza.",
            imagen: "cat-origen.png",
            descripcion:"Todo comienza en ese instante invisible donde decides",
        },
    };
function actualizarContenidoCategoria() {
    const contenido = contenidoCategoria[categoriaActiva];

    if (frase && imagen && descripcion && contenido) {
        imagen.classList.remove("visible");

        frase.textContent = contenido.frase;
        imagen.src = contenido.imagen;
        descripcion.textContent = contenido.descripcion;

        setTimeout(() => {
            imagen.classList.add("visible");
        }, 100);
    }
}

    function aplicarFiltros() {
        cards.forEach(card => {
            const categoriaCard = card.dataset.categoria;
            const tipoCard = card.dataset.tipo;

            const coincideCategoria =
                categoriaActiva === "todos" || categoriaCard === categoriaActiva;

            const coincideTipo =
                tipoActivo === "todos" || tipoCard === tipoActivo;

            if (coincideCategoria && coincideTipo) {
                card.style.display = "block";
            } else {
                card.style.display = "none";
            }
        });
    }

    filtrosCategoria.forEach(boton => {
        boton.addEventListener("click", () => {
            filtrosCategoria.forEach(b => b.classList.remove("active"));
            boton.classList.add("active");

            categoriaActiva = boton.dataset.categoria;
            actualizarContenidoCategoria();
            aplicarFiltros();
        });
    });

    filtrosTipo.forEach(boton => {
        boton.addEventListener("click", () => {
            filtrosTipo.forEach(b => b.classList.remove("active"));
            boton.classList.add("active");

            tipoActivo = boton.dataset.tipo;
            aplicarFiltros();
        });
    });

    actualizarContenidoCategoria();
    aplicarFiltros();
});

/* =========================
   MENU HAMBURGUESA
========================= */

document.addEventListener("DOMContentLoaded", function () {
    const toggle = document.getElementById("menuToggle");
    const nav = document.getElementById("navMenu");

    if (toggle && nav) {
        toggle.addEventListener("click", () => {
            nav.classList.toggle("active");
        });
    }
});
document.addEventListener("DOMContentLoaded", function () {
    const cartToggle = document.getElementById("cartToggle");
    const cartDropdown = document.getElementById("cartDropdown");
    const cartClose = document.getElementById("cartClose");

    if (cartToggle && cartDropdown) {
        cartToggle.addEventListener("click", function (e) {
            e.stopPropagation();
            cartDropdown.classList.toggle("open");
        });
    }

    if (cartClose && cartDropdown) {
        cartClose.addEventListener("click", function () {
            cartDropdown.classList.remove("open");
        });
    }

    document.addEventListener("click", function (e) {
        if (
            cartDropdown &&
            cartToggle &&
            !cartDropdown.contains(e.target) &&
            !cartToggle.contains(e.target)
        ) {
            cartDropdown.classList.remove("open");
        }
    });

    actualizarCarrito();
});